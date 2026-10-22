
export const STATUSES = [
    "AVAILABLE",
    "CHARGING",
    "FAULT",
    "OFFLINE",
    "MAINTENANCE",
];

export const stations = [];

for (let i = 0; i <= 10; i++) {
    stations.push({
        id: "ST-" + i,
        status: "AVAILABLE",
        faultAt: null,
        resetAttempts: 0

    });
}

export const incidents = [];

