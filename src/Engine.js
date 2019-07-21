export default class Engine {

    constructor(URL_CONTENT){
        fetch(`${URL_CONTENT}/angular.json`).then(res=> res.json()).then(data=>{
            this._angular = data;
            console.log("Engine started");
        }
        );
    }

    getGraphFor(name){
        
        const _rootEntry = {...this._angular[name] };
        _rootEntry.children = [];
        _rootEntry.ngDeps.forEach(aDep => {
            _rootEntry.children.push(this._angular[aDep]);
        })

        
        const parents = [];
        for(let anentry of Object.values(this._angular)){
            if(anentry.ngDeps.includes(name)){
                parents.push(anentry)
            }
        }
        return {root:_rootEntry, injectedin:parents}
        
    }
}
