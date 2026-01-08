import {createPositionSliders, createRotationSliders, createScaleSliders} from "@scripts/lil-gui-helper";
import {GUI} from "lil-gui";
import * as THREE from 'three';
import {spyOn} from "@vitest/spy";

describe("Lil gui helper tests", () => {
    describe("CreatePositionSliders tests", () => {
        describe("Success Paths", () => {
            it("CreatePositionSliders_shouldCreatePositionSliders_whenPositionIsValid", () => {
                //Arrange
                const gui = new GUI();
                const addFolderSpy = spyOn(gui, "addFolder");
                const mesh = new THREE.Mesh();
                mesh.name = "cube";

                //Act
                //Assert
                expect(() => {
                    createPositionSliders(gui, mesh, 0, 5, 1);
                }).not.toThrow();
                expect(addFolderSpy).toHaveBeenCalledWith("cube position");
            });
        });

        describe("Failing Paths", () => {
            it("CreatePositionSliders_shouldThrowError_whenPositionIsNull", () => {
                //Arrange
                const gui = new GUI();
                const mockCube = {name: "cube", position: null} as unknown as THREE.Mesh;

                //Act
                //Assert
                expect(() => {
                    createPositionSliders(gui, mockCube, 0, 5);
                }).toThrow("The given element does not have a position attribute.");
            });
        });
    });

    describe("CreateRotationSliders tests", () => {
        describe("Success Paths", () => {
            it("CreateRotationSliders_shouldCreateRotationSliders_whenRotationIsValid", () => {
                //Arrange
                const gui = new GUI();
                const addFolderSpy = spyOn(gui, "addFolder");
                const mesh = new THREE.Mesh();
                mesh.name = "cube";

                //Act
                //Assert
                expect(() => {
                    createRotationSliders(gui, mesh, 0, 5, 1);
                }).not.toThrow();

                expect(addFolderSpy).toHaveBeenCalledWith("cube rotation");
            });
        });

        describe("Failing Paths", () => {
            it("CreateRotationSliders_shouldThrowError_whenRotationIsNull", () => {
                //Arrange
                const gui = new GUI();
                const mockCube = {name: "cube", rotation: null} as unknown as THREE.Mesh;
                //Act
                //Assert
                expect(() => {
                    createRotationSliders(gui, mockCube, 0, 5);
                }).toThrow("The given element does not have a rotation attribute.");
            });
        });
    });

    describe("CreateScaleSliders tests", () => {
        describe("Success Paths", () => {
            it("CreateScaleSliders_shouldCreateScaleSliders_whenScaleIsValid", () => {
                //Arrange
                const gui = new GUI();
                const addFolderSpy = spyOn(gui, "addFolder");
                const mesh = new THREE.Mesh();
                mesh.name = "cube";

                //Act
                //Assert
                expect(() => {
                    createScaleSliders(gui, mesh, 0, 5, 1);
                }).not.toThrow();

                expect(addFolderSpy).toHaveBeenCalledWith("cube scale");
            });
        });

        describe("Failing Paths", () => {
            it("CreateScaleSliders_shouldThrowError_whenScaleIsNull", () => {
                //Arrange
                const gui = new GUI();
                const mockCube = {name: "cube", scale: null} as unknown as THREE.Mesh;
                //Act
                //Assert
                expect(() => {
                    createScaleSliders(gui, mockCube, 0, 5);
                }).toThrow("The given element does not have a scale attribute.");
            });
        });
    });
});
