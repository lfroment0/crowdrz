'use strict';
const availableScope = ['facebook'];
const processList = {
    'facebook': {
        'getComments': require('./process/facebook/getComments')
    }
};
class Crowdrz {
    constructor(scope, key) {
        this.scope = '';
        this.key = '';
        if (availableScope.indexOf(scope) === -1) {
            console.log('Crowdrz JS - This scope is already not supported.');
            return;
        }
        this.scope = scope;
        this.key = key;
        console.log(scope, key);
    }
    applyProcess(name, ressource) {
        processList[this.scope][name](ressource, this.key, (err, res) => {
            if (err) {
                console.log('err', err);
            }
            console.log('res', res);
        });
    }
}
module.exports = Crowdrz;
