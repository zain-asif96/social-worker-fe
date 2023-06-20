import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { css } from "aphrodite";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { BeatLoader } from "react-spinners";
import { WebHeader, DataMap, Modal } from "../../components";
import { GET_STATES } from "../../graphql/queries/states";
import { GET_WORKERS } from "../../graphql/queries/workers";
import { Colors, Images } from "../../theme";
import styles from "./styles.js";

function LandingPage() {
	const radius = 4;

	const [statesData, setStatesData] = useState(() => []);
	const [workers, setWorkers] = useState(() => []);

	const [getStatesData, { loading: stateLoading }] = useLazyQuery(GET_STATES, {
		onCompleted: (data) => {
			// debugger;
			setStatesData(data?.states?.data ?? []);
		},
		// pollInterval: 5000,
		fetchPolicy: "no-cache",
	});

	useEffect(() => {
		getStatesData();
	}, []);

	const { data } = useQuery(GET_WORKERS, {
		onCompleted(data) {
			setWorkers(data?.workers?.data || []);
		},
	});

	// useEffect(() => {

	// }, [states]);

	const bubbleData = workers?.map((worker) => ({
		name: worker.attributes?.name,
		radius,
		city: worker.attributes?.city,
		state: worker.attributes?.state?.data?.attributes?.name || "",
		latitude: worker.attributes?.latitude,
		longitude: worker.attributes?.longitude,
		areaOfSocialWork: worker.attributes?.areaOfSocialWork,
		profileImg: worker.attributes?.profilePhoto?.data?.attributes?.url,
		fillKey: "bubbleFill",
	}));

	const pushWorkerList = (worker) => {
		let arr = _.cloneDeep(workers);
		arr.push(worker);
		setWorkers(arr);
		setStatesData([]);
		getStatesData();
	};

	return (
		<div>
			<WebHeader />
			<Modal pushWorkerList={pushWorkerList} />
			{stateLoading && (
				<div className="loader-wrapper">
					<BeatLoader sizeUnit={"px"} size={15} color={Colors.white} />
				</div>
			)}
			{statesData?.length > 0 && (
				<div className={`${css(styles.mainCont)}`}>
					<DataMap
						scope="usa"
						responsive
						updateChoroplethOptions={{ reset: true }}
						geographyConfig={{
							highlightBorderColor: `${Colors.white}`,
							borderColor: "#171c23",
							highlightFillColor: `${Colors.text.highlightFillColor}`,
							popupTemplate: (geography, data) => {
								const stateName = geography.properties.name;

								const workerCount = statesData.find(
									(state) => state?.attributes?.name === stateName
								)?.attributes?.workers?.data?.length;

								return `<div class=${css(styles.stateHoverInfo)}>
                ${geography.properties.name}
                <span class=${css(styles.workerCount)}>Social Workers: ${
									workerCount || 0
								}</span>
                </div>`;
							},
							highlightBorderWidth: 7,
							borderWidth: 2,
						}}
						fills={{
							Republican: `${Colors.background.primary}`,
							Democrat: `${Colors.background.secondary}`,
							"Heavy Democrat": `${Colors.text.highlightFillColor}`,
							"Light Democrat": `${Colors.text.lightDemo}`,
							defaultFill: `${Colors.background.primary}`,
							bubbleFill: `${Colors.text.bubbleFill}`,
						}}
						data={{
							AZ: {
								fillKey: "Republican",
							},
							CO: {
								fillKey: "Democrat",
							},
							DE: {
								fillKey: "Heavy Democrat",
							},
							FL: {
								fillKey: "Light Democrat",
							},
							GA: {
								fillKey: "Republican",
							},
							HI: {
								fillKey: "Democrat",
							},
							ID: {
								fillKey: "Heavy Democrat",
							},
							IL: {
								fillKey: "Light Democrat",
							},
							IN: {
								fillKey: "Republican",
							},
							IA: {
								fillKey: "Democrat",
							},
							KS: {
								fillKey: "Heavy Democrat",
							},
							KY: {
								fillKey: "Light Democrat",
							},
							LA: {
								fillKey: "Republican",
							},
							MD: {
								fillKey: "Democrat",
							},
							ME: {
								fillKey: "Heavy Democrat",
							},
							MA: {
								fillKey: "Light Democrat",
							},
							MN: {
								fillKey: "Republican",
							},
							MI: {
								fillKey: "Democrat",
							},
							MS: {
								fillKey: "Heavy Democrat",
							},
							MO: {
								fillKey: "Light Democrat",
							},
							MT: {
								fillKey: "Republican",
							},
							NC: {
								fillKey: "Democrat",
							},
							NE: {
								fillKey: "Heavy Democrat",
							},
							NV: {
								fillKey: "Light Democrat",
							},
							NH: {
								fillKey: "Republican",
							},
							NJ: {
								fillKey: "Democrat",
							},
							NY: {
								fillKey: "Heavy Democrat",
							},
							ND: {
								fillKey: "Light Democrat",
							},
							NM: {
								fillKey: "Light Democrat",
							},
							OH: {
								fillKey: "Democrat",
							},
							OK: {
								fillKey: "Heavy Democrat",
							},
							OR: {
								fillKey: "Light Democrat",
							},
							PA: {
								fillKey: "Republican",
							},
							RI: {
								fillKey: "Democrat",
							},
							SC: {
								fillKey: "Heavy Democrat",
							},
							SD: {
								fillKey: "Light Democrat",
							},
							TN: {
								fillKey: "Republican",
							},
							TX: {
								fillKey: "Democrat",
							},
							UT: {
								fillKey: "Heavy Democrat",
							},
							WI: {
								fillKey: "Light Democrat",
							},
							VA: {
								fillKey: "Republican",
							},
							VT: {
								fillKey: "Democrat",
							},
							WA: {
								fillKey: "Heavy Democrat",
							},
							WV: {
								fillKey: "Light Democrat",
							},
							WY: {
								fillKey: "Republican",
							},
							CA: {
								fillKey: "Democrat",
							},
							CT: {
								fillKey: "Heavy Democrat",
							},
							AK: {
								fillKey: "Light Democrat",
							},
							AR: {
								fillKey: "Republican",
							},
							AL: {
								fillKey: "Democrat",
							},
						}}
						bubbles={bubbleData}
						bubbleOptions={{
							highlightFillColor: `${Colors.white}`,
							highlightBorderColor: `${Colors.white}`,
							highlightBorderWidth: 8,
							highlightBorderOpacity: 0.3,
							highlightFillOpacity: `${Colors.white}`,
							borderColor: `${Colors.text.bubbleFill}`,
							borderWidth: 8,
							borderOpacity: 0.3,
							fillOpacity: 1,
							fill: `${Colors.text.bubbleFill}`,
							popupTemplate: (geo, data) => {
								let localImgUrl = `${process.env.REACT_APP_BACKEND_URI}${data.profileImg}`;
								let prodImgUrl = `${data.profileImg}`;
								let imageUrl = !_.isNil(data.profileImg)
									? prodImgUrl
									: Images.default_profile_icon;
								return `<div class=${css(styles.workerHoverInfo)}>
                <img src='${imageUrl}' alt=${data.name} class=${css(
									styles.profileImgStyle
								)} />
                <span class=${css(styles.workerName)}>${data.name}</span>
                <span class=${css(styles.workerCityState)}>${data.city}, ${
									data.state
								}</span>
                <span class=${css(
									styles.socialWork
								)}>Area Of Social Work: <span class=${css(
									styles.socialWorkText
								)}>${data.areaOfSocialWork}</span></span>
                
                </div>`;
							},
						}}
					/>
				</div>
			)}
		</div>
	);
}

const mapStateToProps = () => ({});

const actions = {};

export default connect(mapStateToProps, actions)(LandingPage);
