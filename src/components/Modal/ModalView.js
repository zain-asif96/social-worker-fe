import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Snackbar,
  TextField,
  Tooltip,
} from "@material-ui/core";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import { css } from "aphrodite";
import styles from "./ModalStyles";
import { useEffect, useRef, useState } from "react";
import { AppStyles, Images } from "../../theme";
import { Alert, Autocomplete } from "@material-ui/lab";
import { CREATE_SOCIAL_WORKER } from "../../graphql/mutations/createSocialWorker";
import { GET_STATES } from "../../graphql/queries/states";
import { useMutation, useQuery } from "@apollo/client";
import _ from "lodash";
import { getSortedOptions } from "../../helpers/dataHelpers";
import { Info } from "@material-ui/icons";
import {
  GOOGLE_PLACES_API_KEY,
  INVALID_ADDRESS,
  INVALID_CITY,
  INVALID_EMAIL_ADDRESS,
  INVALID_EMAIL_ERROR,
  INVALID_FULLNAME,
  INVALID_PROFILE_IMAGE,
  INVALID_SOCIAL_WORK_AREA,
  INVALID_STATE,
  INVALID_ZIPCODE,
} from "../../constants";
import Util from "../../services/Util";
import { UPLOAD_FILE } from "../../graphql/mutations/fileUpload";
import GoogleAutocomplete, { usePlacesWidget } from "react-google-autocomplete";

export default function FormDialog(props) {
  const { pushWorkerList, getStatesData } = props;
  const placeHolderImg = "http://via.placeholder.com/700x500";
  const [open, setOpen] = useState(false);
  const [fullName, setFullName] = useState(() => "");
  const [emailAddress, setEmailAddress] = useState(() => "");
  const [address, setAddress] = useState(() => "");
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [socialWorkArea, setSocialWorkArea] = useState(() => "");
  const [city, setCity] = useState(() => "");
  const [zipCode, setZipCode] = useState(() => "");
  const [profileImg, setProfileImg] = useState(() => placeHolderImg);
  const [usaState, setUsaState] = useState(() => {});

  const [addressAutoFocus, setAddressAutoFocus] = useState(() => false);

  const fullNameRef = useRef(null);
  const addressRef = useRef(null);
  const statesRef = useRef(null);
  const emailRef = useRef(null);
  const socialWorkAreaRef = useRef(null);
  const cityRef = useRef(null);
  const zipCodeRef = useRef(null);
  const profileImgRef = useRef(null);

  const [isValidFullName, setIsValidFullName] = useState(() => true);
  const [isValidStates, setIsValidStates] = useState(() => true);
  const [isValidEmailAdd, setIsValidEmailAdd] = useState(() => true);
  const [isValidAddress, setIsValidAddress] = useState(() => true);
  const [isValidSocialAreaWork, setIsValidSocialAreaWork] = useState(
    () => true
  );
  const [isValidCity, setIsValidCity] = useState(() => true);
  const [isValidZipCode, setIsValidZipCode] = useState(() => true);
  const [isValidProfileImg, setIsValidProfileImg] = useState(() => true);

  const [profileId, setProfileId] = useState(() => null);

  //Snackbar State
  const [openSnackBar, setOpenSnackBar] = useState(() => false);
  // Activitycreation Response Message
  const [formSubmitResponse, setFormSubmitResponse] = useState("");

  // **SnackBar Close Handler**
  const snackBarCloseHandler = () => {
    setOpenSnackBar(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // for creating social worker
  const [
    createSocialWorkerReq,
    {
      data: socialWorkerInfo,
      error: socialWorkerError,
      loading: socialWorkerLoading,
    },
  ] = useMutation(CREATE_SOCIAL_WORKER, {
    onCompleted: (data) => {
      pushWorkerList(data.createWorker.data);
      setOpenSnackBar(true);
      setFormSubmitResponse("Social Worker Added.");
      // getStatesData();
    },
  });

  const { data: states_data } = useQuery(GET_STATES);

  useEffect(() => {
    setUsaState({});
    setFullName("");
    setEmailAddress("");
    setAddress("");
    setSocialWorkArea("");
    setCity("");
    setZipCode("");
    setProfileImg(placeHolderImg);
  }, [socialWorkerInfo, socialWorkerError, socialWorkerLoading]);

  const validateForm = () => {
    let isValid = true;
    setIsValidFullName(true);
    setIsValidEmailAdd(true);
    setIsValidStates(true);
    setIsValidAddress(true);
    setIsValidSocialAreaWork(true);
    setIsValidCity(true);
    setIsValidZipCode(true);
    setIsValidProfileImg(true);
    setAddressAutoFocus(false);
    // required check
    if (_.isEmpty(fullName) || !Util.isValidName(fullName)) {
      fullNameRef.current.focus();
      setIsValidFullName(false);
      isValid = false;
    }

    if (_.isEmpty(emailAddress) || !Util.isEmailValid(emailAddress)) {
      emailRef.current.focus();
      setIsValidEmailAdd(false);
      isValid = false;
    }

    if (_.isEmpty(address)) {
      setAddressAutoFocus(true);
      setIsValidAddress(false);
      isValid = false;
    }

    if (
      _.isEmpty(socialWorkArea) ||
      !Util.isValidAreaOfSocialWork(socialWorkArea)
    ) {
      socialWorkAreaRef.current.focus();
      setIsValidSocialAreaWork(false);
      isValid = false;
    }

    if (_.isEmpty(city) || !Util.isValidCity(city)) {
      cityRef.current.focus();
      setIsValidCity(false);
      isValid = false;
    }

    if (_.isEmpty(zipCode) || !Util.isValidZipCode(zipCode)) {
      zipCodeRef.current.focus();
      setIsValidZipCode(false);
      isValid = false;
    }

    // if (_.isEmpty(profileImg) || profileImg === placeHolderImg) {
    //   profileImgRef.current.focus();
    //   setIsValidProfileImg(false);
    //   isValid = false;
    // }

    if (_.isEmpty(usaState)) {
      statesRef.current.focus();
      setIsValidStates(false);
      isValid = false;
    }
    // if (!_.isEmpty(observation) && !Util.isValidObservation(observation)) {
    //   usersRef.current.focus();
    //   setIsValidObservation(false);
    //   isValid = false;
    // }

    return isValid;
  };

  // *form onSubmit func*
  const createSocialWorkerFunc = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const vars = {
        name: fullName,
        email: emailAddress,
        address: address,
        areaOfSocialWork: socialWorkArea,
        city: city,
        zipCode: parseInt(zipCode),
        profilePhoto: profileId,
        state: usaState.id,
        latitude: coordinates.lat,
        longitude: coordinates.lng,
      };

      createSocialWorkerReq({
        variables: {
          ...vars,
        },
      });

      setOpen(false);
    }
  };

  // upload image
  const [uploadImage] = useMutation(UPLOAD_FILE, {
    onCompleted: (data) => {
      setProfileId(data?.upload?.data?.id);
    },
  });

  function duck(evt) {
    const image = evt.target.files[0];
    uploadImage({
      variables: {
        file: image,
      },
    });
    if (image) {
      const src = URL.createObjectURL(image);
      setProfileImg(src);
      setIsValidProfileImg(true);
    }
  }

  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const ll = await getLatLng(results[0]);

    let cityName = "";
    let postCode = "";
    results[0]?.address_components?.forEach((element) => {
      if (element?.types[0] == "administrative_area_level_3") {
        cityName = element?.long_name;
      }
      if (element?.types[0] == "locality") {
        cityName = element?.long_name;
      }
      if (element.types[0] == "postal_code_prefix") {
        postCode = element?.long_name;
      }
      if (element.types[0] == "postal_code") {
        postCode = element?.long_name;
      }
    });

    setAddress(value);
    setCity(cityName);
    setZipCode(postCode);
    setCoordinates(ll);
  };

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        open={openSnackBar}
        autoHideDuration={4000}
        onClose={snackBarCloseHandler}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={snackBarCloseHandler}
          severity="success"
        >
          {formSubmitResponse}
        </Alert>
      </Snackbar>
      <div className={`${css(styles.modalWrap)}`}>
        <Button
          variant="outlined"
          onClick={handleClickOpen}
          className={`${css(styles.formOpenBtn)}`}
        >
          Add Your Information Here
        </Button>
        <Dialog open={open} onClose={handleClose} className={`dialogInnerWrap`}>
          <DialogTitle>Add Your Information Here</DialogTitle>
          <Box
            component="img"
            className={`${css(styles.closeIcon)}`}
            alt="close icon"
            src={`${Images.close_icon}`}
            onClick={handleClose}
          />
          <DialogContent>
            <form
              noValidate
              autoComplete="off"
              onSubmit={createSocialWorkerFunc}
            >
              {/* Image Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <div className="containers">
                  <div className="imageWrapper">
                    <img className="image" id="img" src={profileImg} />
                  </div>
                  <div className="file-upload">
                    {/* <input
                    type="file"
                    className="file-input"
                    id="fileInput"
                    onchange={() => duck()}
                  /> */}

                    <TextField
                      id="fileInput"
                      type="file"
                      fullWidth
                      className={`file-input`}
                      onChange={duck}
                      ref={profileImgRef}
                    />
                    <img
                      src={Images.choose_img_icon}
                      alt="choos-img"
                      className="choose-img"
                    />
                  </div>
                </div>
                <label className={`${css(styles.imgLabelText)}`}>
                  Upload a photo of yourself here.
                </label>
              </div>

              {/* FullName Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>Name</label>
                <TextField
                  id="fullName"
                  type="text"
                  fullWidth
                  className={`inputField`}
                  value={fullName}
                  onChange={(e) =>
                    setFullName(e.target.value, setIsValidFullName(true))
                  }
                  ref={fullNameRef}
                />
                {!isValidFullName ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_FULLNAME}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Email Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>
                  Email
                  <div className={`${css(styles.tooltipIconWrap)} infoIcon`}>
                    <Tooltip
                      placement="left"
                      title="Email will not be displayed on the map."
                    >
                      <IconButton>
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </div>
                </label>
                <TextField
                  id="email"
                  type="email"
                  fullWidth
                  className={`inputField`}
                  value={emailAddress}
                  onChange={(e) =>
                    setEmailAddress(e.target.value, setIsValidEmailAdd(true))
                  }
                  ref={emailRef}
                />
                {!isValidEmailAdd ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_EMAIL_ADDRESS}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Address Autocomplete Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>
                  Address
                  <div className={`${css(styles.tooltipIconWrap)} infoIcon`}>
                    <Tooltip
                      placement="left"
                      title="For location accuracy we require your address. Your address won't be public."
                    >
                      <IconButton>
                        <Info />
                      </IconButton>
                    </Tooltip>
                  </div>
                </label>

                <PlacesAutocomplete
                  value={address}
                  onChange={setAddress}
                  onSelect={handleSelect}
                  searchOptions={{
                    types: ["address"],
                    componentRestrictions: { country: ["us"] },
                  }}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => (
                    <div>
                      <TextField
                        id="address"
                        fullWidth
                        className={`inputField location-search-input`}
                        {...getInputProps({
                          className: "location-search-input inputField",
                          autoComplete: "on",
                          role: "combobox",
                          "aria-autocomplete": "list",
                          autoFocus: addressAutoFocus,
                        })}
                      />

                      <div className="autocomplete-dropdown-container">
                        {loading && <div>Loading...</div>}
                        {suggestions.map((suggestion) => {
                          const className = suggestion.active
                            ? "suggestion-item--active"
                            : "suggestion-item";
                          // inline style for demonstration purpose
                          const style = suggestion.active
                            ? {
                                backgroundColor: "#fafafa",
                                cursor: "pointer",
                                padding: 10,
                              }
                            : {
                                backgroundColor: "#ffffff",
                                cursor: "pointer",
                                padding: 10,
                              };
                          return (
                            <div
                              {...getSuggestionItemProps(suggestion, {
                                className,
                                style,
                              })}
                            >
                              <span>{suggestion.description}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </PlacesAutocomplete>
                {!isValidAddress ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_ADDRESS}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Social Area Work Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>
                  What area of social work are you in?
                </label>
                <TextField
                  id="areaOfSocialWork"
                  type="text"
                  fullWidth
                  className={`inputField`}
                  value={socialWorkArea}
                  onChange={(e) =>
                    setSocialWorkArea(
                      e.target.value,
                      setIsValidSocialAreaWork(true)
                    )
                  }
                  ref={socialWorkAreaRef}
                />
                {!isValidSocialAreaWork ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_SOCIAL_WORK_AREA}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* City Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>City</label>
                <TextField
                  id="city"
                  type="text"
                  fullWidth
                  className={`inputField`}
                  value={city}
                  onChange={(e) =>
                    setCity(e.target.value, setIsValidCity(true))
                  }
                  ref={cityRef}
                />
                {!isValidCity ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_CITY}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* Zipcode Field */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>Zip Code</label>
                <TextField
                  id="zipcode"
                  type="number"
                  fullWidth
                  className={`inputField`}
                  value={zipCode}
                  onChange={(e) =>
                    setZipCode(e.target.value, setIsValidZipCode(true))
                  }
                  ref={zipCodeRef}
                />
                {!isValidZipCode ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_ZIPCODE}
                  </span>
                ) : (
                  ""
                )}
              </div>

              {/* States Autocomplete */}
              <div className={`${css(styles.fieldWrapper)} my-4`}>
                <label className={`${css(styles.labelText)}`}>State</label>
                <Autocomplete
                  id="states"
                  options={states_data?.states?.data ?? []}
                  getOptionLabel={(option) => {
                    return option?.attributes?.name ?? "";
                  }}
                  getOptionSelected={(option, value) => {
                    return option?.attributes?.name === value?.attributes?.name;
                  }}
                  value={usaState || []}
                  onChange={(event, newVal) => {
                    return setUsaState(
                      // newVal?.attributes?.name,
                      newVal,
                      setIsValidStates(true)
                    );
                  }}
                  ref={statesRef}
                  className={`inputField`}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" />
                  )}
                />
                {!isValidStates ? (
                  <span className={`${css(AppStyles.formError)}`}>
                    {INVALID_STATE}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <Button
                onClick={createSocialWorkerFunc}
                className={`${css(styles.submitBtn)}`}
              >
                Submit
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}
