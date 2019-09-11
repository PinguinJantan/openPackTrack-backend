let models = require('../models');

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
                if (prev[i]) diffPrev[i] = prev[i];
                if (next[i]) diffNext[i] = next[i];
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

exports.resource = {
    ITEM: 'item',
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
