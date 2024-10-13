function calculateRepMax() {
    // Get the selected lift type and input values
    const liftType = document.getElementById('lift-type').value;
    const weight = parseFloat(document.getElementById('weight').value); // Added weight or counterbalance
    const reps = parseInt(document.getElementById('reps').value);
    const bodyweight = parseFloat(document.getElementById('bodyweight').value) || 0;
    const counterbalance = parseFloat(document.getElementById('counterbalance').value) || 0; // Counterbalance for assisted dips

    let oneRepMax = 0;
    let actualMax = 0; // For displaying the added weight for weighted dips/chins and counterbalance for assisted dips

    // Reset output message before calculation
    let outputMessage = '';

    // Percentage table based on reps performed
    const percentageTable = {
        1: 1.00,  // 100% of 1RM
        2: 0.95,  // 95% of 1RM
        3: 0.93,  // 93% of 1RM
        4: 0.90,  // 90% of 1RM
        5: 0.87,  // 87% of 1RM
        6: 0.85,  // 85% of 1RM
        7: 0.83,  // 83% of 1RM
        8: 0.80,  // 80% of 1RM
        9: 0.77,  // 77% of 1RM
        10: 0.75, // 75% of 1RM
        12: 0.70  // 70% of 1RM
    };

    const repMaxFactor = percentageTable[reps] || 1.00; // Get the percentage based on reps performed

    // Calculate 1RM based on selected lift type
    if (liftType === "dips") {
        // For weighted dips/chin-ups, calculate 1RM with bodyweight adjustments
        const totalWeight = (bodyweight * 0.85) + weight;  // 85% of body weight + added weight
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the total 1RM (total weight)
        actualMax = oneRepMax - (bodyweight * 0.85);  // Display only added weight as the 1RM
        
        // When calculating percentages, we need to subtract 85% of bodyweight
        const adjustedWeight = function (percent) {
            const total = oneRepMax * percent;
            const weightToAdd = total - (bodyweight * 0.85);
            return roundToNearest5(weightToAdd);  // Calculate weight to add
        };

        const displayWeight = function(weight) {
            return weight <= 0 ? "Bodyweight Only" : `${weight} lbs`; // Handle negative values
        };

        const weight60 = adjustedWeight(0.60);
        const weight65 = adjustedWeight(0.65);
        const weight70 = adjustedWeight(0.70);
        const weight75 = adjustedWeight(0.75);
        const weight80 = adjustedWeight(0.80);
        const weight85 = adjustedWeight(0.85);
        const weight90 = adjustedWeight(0.90);
        const weight95 = adjustedWeight(0.95);
        const weight100 = adjustedWeight(1.00);

        outputMessage = `
            60% of 1RM: ${displayWeight(weight60)}
            <br>
            65% of 1RM: ${displayWeight(weight65)}
            <br>
            70% of 1RM: ${displayWeight(weight70)}
            <br>
            75% of 1RM: ${displayWeight(weight75)}
            <br>
            80% of 1RM: ${displayWeight(weight80)}
            <br>
            85% of 1RM: ${displayWeight(weight85)}
            <br>
            90% of 1RM: ${displayWeight(weight90)}
            <br>
            95% of 1RM: ${displayWeight(weight95)}
            <br>
            100% of 1RM: ${displayWeight(weight100)}
        `;

    } else if (liftType === "assisted-dips") {
        // For assisted dips/chin-ups, subtract the counterbalance from bodyweight
        const totalWeight = bodyweight - counterbalance;
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM

        const adjustedWeight = function (percent) {
            const total = oneRepMax * percent;
            const counterbalanceToSelect = bodyweight - total;
            if (counterbalanceToSelect <= 0) {
                // If negative, switch to unassisted and add weight to dip belt
                return roundToNearest5(Math.abs(counterbalanceToSelect)) + " lbs added";
            } else {
                return roundToNearest5(counterbalanceToSelect) + " lbs worth of counterbalance";
            }
        };

        const weight60 = adjustedWeight(0.60);
        const weight65 = adjustedWeight(0.65);
        const weight70 = adjustedWeight(0.70);
        const weight75 = adjustedWeight(0.75);
        const weight80 = adjustedWeight(0.80);
        const weight85 = adjustedWeight(0.85);
        const weight90 = adjustedWeight(0.90);
        const weight95 = adjustedWeight(0.95);
        const weight100 = adjustedWeight(1.00);

        outputMessage = `
            60% of 1RM: ${weight60}
            <br>
            65% of 1RM: ${weight65}
            <br>
            70% of 1RM: ${weight70}
            <br>
            75% of 1RM: ${weight75}
            <br>
            80% of 1RM: ${weight80}
            <br>
            85% of 1RM: ${weight85}
            <br>
            90% of 1RM: ${weight90}
            <br>
            95% of 1RM: ${weight95}
            <br>
            100% of 1RM: ${weight100}
        `;

    } else if (liftType === "squat" || liftType === "other") {
        // For squats and other accessory lifts, just calculate the 1RM based on added weight
        oneRepMax = weight / repMaxFactor;
        actualMax = oneRepMax;

        const weight60 = roundToNearest5(oneRepMax * 0.60);
        const weight65 = roundToNearest5(oneRepMax * 0.65);
        const weight70 = roundToNearest5(oneRepMax * 0.70);
        const weight75 = roundToNearest5(oneRepMax * 0.75);
        const weight80 = roundToNearest5(oneRepMax * 0.80);
        const weight85 = roundToNearest5(oneRepMax * 0.85);
        const weight90 = roundToNearest5(oneRepMax * 0.90);
        const weight95 = roundToNearest5(oneRepMax * 0.95);
        const weight100 = roundToNearest5(oneRepMax * 1.00);

        outputMessage = `
            60% of 1RM: ${weight60} lbs
            <br>
            65% of 1RM: ${weight65} lbs
            <br>
            70% of 1RM: ${weight70} lbs
            <br>
            75% of 1RM: ${weight75} lbs
            <br>
            80% of 1RM: ${weight80} lbs
            <br>
            85% of 1RM: ${weight85} lbs
            <br>
            90% of 1RM: ${weight90} lbs
            <br>
            95% of 1RM: ${weight95} lbs
            <br>
            100% of 1RM: ${weight100} lbs
        `;
    }

    // Display the output message
    document.getElementById('result').innerHTML = outputMessage;
}

// Function to round to the nearest 5 lbs
function roundToNearest5(weight) {
    return Math.round(weight / 5) * 5;
}

// Show bodyweight and counterbalance fields based on the selected lift type
document.getElementById('lift-type').addEventListener('change', function() {
    const liftType = document.getElementById('lift-type').value;
    
    if (liftType === 'dips' || liftType === 'assisted-dips') {
        document.getElementById('bodyweight-section').style.display = 'block';
    } else {
        document.getElementById('bodyweight-section').style.display = 'none';
    }

    if (liftType === 'assisted-dips') {
        document.getElementById('counterbalance-section').style.display = 'block';
        document.getElementById('weight-section').style.display = 'none';
    } else {
        document.getElementById('counterbalance-section').style.display = 'none';
        document.getElementById('weight-section').style.display = 'block';
    }

    if (liftType === 'squat' || liftType === 'other') {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Lifted (in lbs):";
    } else {
        document.getElementById('weight-section').querySelector('label').textContent = "Weight Added to Dip Belt (in lbs):";
    }
});
