/* Functions for building controls: makeControls() gets called in sketch.js */
// Settings for the controls we'll build
const controlSettings = [
    {
        category: "Border Outline",
        sliders: [{
            label: "Minimum Radius", id: "minRadius", minVal: 2, maxVal: 200, value: 100, step: 1, update: () => redraw()
        },
        {
            label: "Maximum Radius", id: "maxRadius", minVal: 100, maxVal: 500, value: 300, step: 1, update: () => redraw()
        },
        {
            label: "Radius Divisions", id: "radiusDivisions", minVal: 3, maxVal: 2000, value: 100, step: 1, update: () => {
                redraw();
            }
        },
        {
            label: "Perlin Variablility", id: "perlinVariability", minVal: 1, maxVal: 100, value: 25, step: 1, update: () => {
                redraw();
            }
        }]
    },
    {
        category: "Cells",
        sliders: [
            {
                label: "Number of Cells", id: "numberOfCells", minVal: 1, maxVal: 400, value: 100, step: 1, update: () => {
                    resetCells();
                }
            },
            {
                label: "Distrubtion of Cells", id: "cellDistribution", minVal: 1, maxVal: 25, value: 5, step: 1, update: () => {
                    resetCells();
                }
            },
            {
                label: "Cell Scaling", id: "cellScaling", minVal: -10, maxVal: 10, value: 1, step: .05, update: () => {
                    redraw();
                }
            }
        ]
    }
];


// Function to make a slider
function makeSlider(options = { label: "Label", minVal: 0, maxVal: 50, value: 10, step: 1, parent: createDiv(), update: () => { } }) {
    let wrapper = createDiv(options.label);
    wrapper.parent(options.parent);
    wrapper.class("slider");
    let slider = createSlider(options.minVal, options.maxVal, options.value, options.step);
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
    let controls = []
    controlSettings.map(category => {
        createDiv("<hr>").parent(controlWrapper)
        let categoryHeader = createDiv(`<h5>${category.category}</h5>`);
        categoryHeader.parent(controlWrapper)

        category.sliders.map(d => {
            d.parent = controlWrapper;
            controls.push({
                id: d.id,
                control: makeSlider(d)
            })
        })
    })
    return controls
}