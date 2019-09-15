let models = require('../models');

const isNullOrUndefinedOrNaN = (value) => {
    if (typeof value === 'null' ||
        typeof value === 'undefined' ||
        Number.isNaN(value)) {
            return true;
        }
    return false;
}

const getJSONDiff = (prev = {}, next = {}) => {
    const diffPrev = {};
    const diffNext = {};
    if (Object.keys(next).length < 1) {
        return [prev, {}];
    }
    for(let i in next) {
        if(!prev.hasOwnProperty(i) || next[i] !== prev[i]) {
            if(
                !Array.isArray(next[i]) ||
                !(JSON.stringify(next[i]) == JSON.stringify(prev[i]))
            ){
                if (!isNullOrUndefinedOrNaN(prev[i]) || !isNullOrUndefinedOrNaN(next[i])
                ) {
                    diffPrev[i] = !isNullOrUndefinedOrNaN(prev[i]) ? prev[i] : null;
                    diffNext[i] = !isNullOrUndefinedOrNaN(next[i]) ? next[i] : null;
                }
            }
        }
    }
    for(let i in prev) {
        if(!next.hasOwnProperty(i) || prev[i] !== next[i]) {
            if(
                !Array.isArray(prev[i]) ||
                !(JSON.stringify(prev[i]) == JSON.stringify(next[i]))
            ){
                if (!isNullOrUndefinedOrNaN(prev[i]) || !isNullOrUndefinedOrNaN(next[i])
                ) {
                    diffPrev[i] = !isNullOrUndefinedOrNaN(prev[i]) ? prev[i] : null;
                    diffNext[i] = !isNullOrUndefinedOrNaN(next[i]) ? next[i] : null;
                }
            }
        }
    }
    const exactlySame = JSON.stringify(diffPrev) === JSON.stringify(diffNext);
    return [diffPrev, diffNext, exactlySame];
}

exports.operation = {
    CREATE: 'create',
    UPDATE: 'update',
    DELETE: 'delete',
}

exports.getJSONDiff = getJSONDiff;

exports.logData = (prevValue, nextValue, operation, resource, resourceID, desc, reference, referenceID) => {
    const [diffPrev, diffNext, exactlySame] = getJSONDiff(prevValue, nextValue);
    const now = new Date();
    if (exactlySame) return;
    models.Log.create({
        diffPrev,
        diffNext,
        op: operation,
        resource,
        resourceID,
        desc,
        ref: reference,
        refID: referenceID,
        createdAt: now,
        updatedAt: now,
    })
}
