import { useState, useRef } from "react";
// import * as THREE from "three";
import { Physics, RigidBody } from "@react-three/rapier";

import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default function Experience() {
	const [stopVerticalAnimation, setStopVerticalAnimation] = useState(false);
	const [stopHorizontalAnimation, setStopHorizontalAnimation] = useState(false);

	const leftHorizontalRef = useRef();
	const middleHorizontalRef = useRef();
	const rightHorizontalRef = useRef();
	const leftVerticalRef = useRef();
	const rightVerticalRef = useRef();

	useFrame((state) => {
		const time = state.clock.getElapsedTime();

		// Vertical animAtion starting point and speed
		const y = 20 - time * 10;

		if (!stopVerticalAnimation) {
			leftHorizontalRef.current.setNextKinematicTranslation({
				x: 0,
				y: y,
				z: 0,
			});

			middleHorizontalRef.current.setNextKinematicTranslation({
				x: 0,
				y: y,
				z: 0,
			});

			rightHorizontalRef.current.setNextKinematicTranslation({
				x: 0,
				y: y,
				z: 0,
			});

			if (y <= 0) {
				setStopVerticalAnimation(true);
			}
		}

		// Horizontal animAtion starting point and speed
		const x = 20 - time * 10;

		if (!stopHorizontalAnimation) {
			leftVerticalRef.current.setNextKinematicTranslation({
				x: x,
				y: 0,
				z: 0,
			});

			rightVerticalRef.current.setNextKinematicTranslation({
				x: x,
				y: 0,
				z: 0,
			});

			if (x <= 0) {
				setStopHorizontalAnimation(true);
			}
		}
	});

	return (
		<>
			<OrbitControls makeDefault />

			<directionalLight position={[1, 2, 3]} intensity={1.5} />
			<ambientLight intensity={0.5} />

			<Physics>
				{/* Horizontal Balls */}
				<RigidBody ref={leftHorizontalRef} type={"kinematicPosition"}>
					<mesh position={[-7, 0, 0]} scale={1.5}>
						<sphereGeometry />
						<meshStandardMaterial color="#ffe0d6" />
					</mesh>
				</RigidBody>

				<RigidBody ref={middleHorizontalRef} type={"kinematicPosition"}>
					<mesh position={[-3, 0, 0]} scale={1.5}>
						<sphereGeometry />
						<meshStandardMaterial color="#ffe0d6" />
					</mesh>
				</RigidBody>

				<RigidBody ref={rightHorizontalRef} type={"kinematicPosition"}>
					<mesh position={[1, 0, 0]} scale={1.5}>
						<sphereGeometry />
						<meshStandardMaterial color="#ffe0d6" />
					</mesh>
				</RigidBody>

				{/* Vertical Balls */}
				<RigidBody ref={leftVerticalRef} type={"kinematicPosition"}>
					<mesh position={[-3, -8, 0]} scale={1.5}>
						<sphereGeometry />
						<meshStandardMaterial color="#ffe0d6" />
					</mesh>
				</RigidBody>

				<RigidBody ref={rightVerticalRef} type={"kinematicPosition"}>
					<mesh position={[-3, -4, 0]} scale={1.5}>
						<sphereGeometry />
						<meshStandardMaterial color="#ffe0d6" />
					</mesh>
				</RigidBody>
			</Physics>
		</>
	);
}
