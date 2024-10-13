function calculateRepMax() {
    const liftType = document.getElementById('lift-type').value;
    const weight = parseFloat(document.getElementById('weight').value); // Added weight or assisted counterbalance
    const reps = parseInt(document.getElementById('reps').value);
    const bodyweight = parseFloat(document.getElementById('bodyweight').value) || 0;
    const counterbalance = parseFloat(document.getElementById('counterbalance').value) || 0; // Counterbalance for assisted dips

    let oneRepMax = 0;
    let adjustedWeight = 0;

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

    const repMaxFactor = percentageTable[reps] || 1.00;

    if (liftType === "dips") {
        // For weighted dips/chin-ups, calculate 1RM with bodyweight adjustments
        const totalWeight = (bodyweight * 0.85) + weight;  // 85% of body weight + added weight
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM
        
        // When calculating 60-75%, we subtract 85% of bodyweight
        adjustedWeight = function (percent) {
            const total = oneRepMax * percent;
            const weightToAdd = total - (bodyweight * 0.85);
            return roundToNearest5(weightToAdd);  // Round to nearest 5 lbs
        };
    } else if (liftType === "assisted-dips") {
        // For assisted dips/chin-ups, subtract the counterbalance from bodyweight
        const totalWeight = bodyweight - counterbalance;
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM

        // When calculating 60-75%, display counterbalance to be selected
        adjustedWeight = function (percent) {
            const total = oneRepMax * percent;
            const counterbalanceToSelect = bodyweight - total;
            return roundToNearest5(counterbalanceToSelect);  // Round to nearest 5 lbs
        };
    } else if (liftType === "squat") {
        // For squats, just calculate the 1RM based on added weight
        oneRepMax = weight / repMaxFactor;
        
        // Squat percentages don't need to adjust for body weight
        adjustedWeight = function (percent) {
            return roundToNearest5(oneRepMax * percent);  // Round to nearest 5 lbs
        };
    }

    // Display results with specific messages for assisted dips
    let outputMessage;
    if (liftType === "assisted-dips") {
        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(oneRepMax)} lbs worth of counterbalance
            <br><br>
            60% of your 1RM: ${adjustedWeight(0.60)} lbs worth of counterbalance
            <br>
            65% of your 1RM: ${adjustedWeight(0.65)} lbs worth of counterbalance
            <br>
            70% of your 1RM: ${adjustedWeight(0.70)} lbs worth of counterbalance
            <br>
            75% of your 1RM: ${adjustedWeight(0.75)} lbs worth of counterbalance
        `;
    } else {
        outputMessage = `
            Your 1 Rep Max is: ${roundToNearest5(oneRepMax)} lbs
            <br><br>
            60% of your 1RM: ${formatWeight(adjustedWeight(0.60))}
            <br>
            65% of your 1RM: ${formatWeight(adjustedWeight(0.65))}
            <br>
            70% of your 1RM: ${formatWeight(adjustedWeight(0.70))}
            <br>
            75% of your 1RM: ${formatWeight(adjustedWeight(0.75))}
        `;
    }

    document.getElementById('result').innerHTML = outputMessage;
}

// Function to round to the nearest 5 lbs
function roundToNearest5(weight) {
    return Math.round(weight / 5) * 5;
}

// Function to format the weight, show "Bodyweight Only" for negative values
function formatWeight(weight) {
    if (weight <= 0) {
        return "Bodyweight Only";
    }
    return `${weight} lbs`;
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
    } else {
        document.getElementById('counterbalance-section').style.display = 'none';
    }
});
