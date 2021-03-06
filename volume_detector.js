'use strict';

function VolumeDetector(f, v){
    this.isPlaying = false;
    this.volumeThreshold = v;
    this.frequencyThreshold = f;
    this.frequencyBuff = null;
}

VolumeDetector.prototype.togglePlay = function(){
    this.isPlaying = !this.isPlaying;
};

VolumeDetector.prototype.updateVolumeThreshold = function(v){
    this.volumeThreshold = v;
};


VolumeDetector.prototype.updateFrequencyThreshold = function(v){
    this.frequencyThreshold = v;
};


VolumeDetector.prototype._reachFrequency = function(){
    for(let i=this.frequencyThreshold;i < this.frequencyBuff.length;i++){
        if(this.frequencyBuff[i] > 0){
            return true;
        }
    }
    return false;
}

VolumeDetector.prototype.updateAverageVolume = function(){
        let values = 0,
            length = this.frequencyBuff.length;
        for (let i = 0; i < length; i++) {
            values += this.frequencyBuff[i];
        }
        this.averageVolume = Math.round(values / length);
};

VolumeDetector.prototype.reachThreshold = function(){
    return this._reachFrequency() && this.averageVolume > this.volumeThreshold;
};

