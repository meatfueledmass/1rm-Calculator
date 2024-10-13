function calculateRepMax() {
    const liftType = document.getElementById('lift-type').value;
    const weight = parseFloat(document.getElementById('weight').value);
    const reps = parseInt(document.getElementById('reps').value);
    const bodyweight = parseFloat(document.getElementById('bodyweight').value) || 0;

    let oneRepMax = 0;
    let adjustedWeight = 0;

    // Use the percentage table to estimate the 1RM based on reps performed
    const percentageTable = {
        1: 1.00,
        2: 0.95,
        3: 0.93,
        4: 0.90,
        5: 0.87,
        6: 0.85,
        7: 0.83,
        8: 0.80,
        9: 0.77,
        10: 0.75,
        12: 0.70
    };

    const repMaxFactor = percentageTable[reps] || 1.00;
    
    if (liftType === "dips") {
        // For weighted dips/chin-ups, calculate 1RM with bodyweight adjustments
        const totalWeight = (bodyweight * 0.85) + weight;  // 85% of body weight + added weight
        oneRepMax = totalWeight / repMaxFactor;  // Estimate the 1RM
        
        // When calculating 60-75%, we subtract 85% of bodyweight
        adjustedWeight = function (percent) {
            const total = oneRepMax * percent;
            return total - (bodyweight * 0.85);
        };
    } else if (liftType === "squat") {
        // For squats, just calculate the 1RM based on added weight
        oneRepMax = weight / repMaxFactor;
        
        // Squat percentages don't need to adjust for body weight
        adjustedWeight = function (percent) {
            return oneRepMax * percent;
        };
    }

    // Display results
    document.getElementById('result').innerHTML = `
        Your 1 Rep Max is: ${oneRepMax.toFixed(2)} lbs
        <br><br>
        60% of your 1RM: ${adjustedWeight(0.60).toFixed(2)} lbs
        <br>
        65% of your 1RM: ${adjustedWeight(0.65).toFixed(2)} lbs
        <br>
        70% of your 1RM: ${adjustedWeight(0.70).toFixed(2)} lbs
        <br>
        75% of your 1RM: ${adjustedWeight(0.75).toFixed(2)} lbs
    `;
}

// Show bodyweight field only for dips/chin-ups
document.getElementById('lift-type').addEventListener('change', function() {
    const liftType = document.getElementById('lift-type').value;
    if (liftType === 'dips') {
        document.getElementById('bodyweight-section').style.display = 'block';
    } else {
        document.getElementById('bodyweight-section').style.display = 'none';
    }
});
