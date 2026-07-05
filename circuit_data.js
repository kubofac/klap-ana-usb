// circuit_data.js セクター対応版
const circuitData = {
    "0": {
        name: "白糸S",
        startLineP1: [138.622532514261, 35.3081896115975],
        startLineP2: [138.622637774426, 35.3080490509764],
        // セクター1
        s1LineP1: [138.622164, 35.308807], 
        s1LineP2: [138.622118, 35.308938],
        // セクター2
        s2LineP1: [138.621994, 35.308256], 
        s2LineP2: [138.621974, 35.308074],
        // セクター3
        s3LineP1: [138.621356, 35.308379], 
        s3LineP2: [138.621571, 35.308192]
    }, // 白糸Sのデータはここで初めて閉じます

    "1": {
        name: "富士C",
        startLineP1: [138.93342054530245, 35.36915226810625],
        startLineP2: [138.93342597911342, 35.369400744949374]
    },
    "2": {
        name: "つま恋",
        startLineP1: [138.05198121210296, 34.76643085806565],
        startLineP2: [138.05223275948995, 34.766356370794476]
    },
    "3": {
        name: "中井C",
        startLineP1: [139.219693211601, 35.35030582177035],
        startLineP2: [139.21950544739443, 35.35034913580831]
    }
};

// HTML側の設計（localStorage + drawSavedLines）に合わせた読み込み関数
function loadCircuitLinesToStorage(circuitId) {
    if (!circuitData[circuitId]) return null;
    
    const data = circuitData[circuitId];
    const targets = ['startLine', 's1Line', 's2Line', 's3Line'];
    
    targets.forEach(t => {
        if (data[t + 'P1'] && data[t + 'P2']) {
            localStorage.setItem(t + 'P1Lat', data[t + 'P1'][1]);
            localStorage.setItem(t + 'P1Lon', data[t + 'P1'][0]);
            localStorage.setItem(t + 'P2Lat', data[t + 'P2'][1]);
            localStorage.setItem(t + 'P2Lon', data[t + 'P2'][0]);
        } else {
            localStorage.removeItem(t + 'P1Lat');
            localStorage.removeItem(t + 'P1Lon');
            localStorage.removeItem(t + 'P2Lat');
            localStorage.removeItem(t + 'P2Lon');
        }
    });
    
    return data;
}
