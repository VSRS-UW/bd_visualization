/* Functions for building controls: makeControls() gets called in sketch.js */
// Settings for the controls we'll build
const controlSettings = [
    {
        label: "Minimum Radius", id: "minRadius", minVal: 2, maxVal: 200, value: 100, step: 1, update: () => { 
            //changedControls();
        }
    },
    {
        label: "Maximum Radius", id: "maxRadius", minVal: 200, maxVal: 500, value: 350, step: 1, update: () => { 
            //changedControls();
        }
    },
    {
        label: "Radius Divisions", id: "radiusDivisions", minVal: 3, maxVal: 2000, value: 100, step: 1, update: () => {
            //changedControls();
        }
    },
    {
        label: "Perlin Variablility", id: "perlinVariability", minVal: 1, maxVal: 100, value: 25, step: 1, update: () => {
            //changedControls();
        }
    },
    {
        label: "Number of Cells", id: "numberOfCells", minVal: 1, maxVal: 200, value: 10, step: 10, update: () => {
            createCells();
        }
    },
    {
        label: "Distribution of Cells", id: "distributionOfCells", minVal: 1, maxVal: 10, value: 5, step: 1, update: () => {
            createCells();
        }
    },
    {
        label: "Cell Diameter", id: "cellDiameter", minVal: 1, maxVal: 100, value: 50, step: 10, update: () => {
            //changedControls();
        }
    },
    {
        label: "Brightest", id: "brightest", minVal: 0, maxVal: 255, value: 255, step: 51, update: () => {
            //changedControls();
        }
    },
    {
        label: "Darkest", id: "darkest", minVal: 0, maxVal: 255, value: 0, step: 51, update: () => {
            //changedControls();
        }
    }
];


// Function to make a slider
function makeSlider(options = { label: "Label", minVal: 0, maxVal: 50, value: 10, step: 1, parent: createDiv(), update: () => { } }) {
    let wrapper = createDiv(options.label);
    wrapper.parent(options.parent);
    wrapper.class("slider");
    let slider = createSlider(options.minVal, options.maxVal, options.value, options.step);
    slider.changed(changedControls);
    slider.input(options.update); // function to do on update
    slider.class("form-control-range")
    slider.parent(wrapper);
    return (slider);
}

// Function to make all of the controls (e.g., sliders)
function makeControls() {
    let controlWrapper = createDiv().id("control-wrapper");
    let controlHeader = createDiv("<h2>Controls</h2>");
    controlHeader.parent(controlWrapper);
    return controlSettings.map(d => {
        d.parent = controlWrapper;
        return {
            id: d.id,
            control: makeSlider(d)
        }
    })
}