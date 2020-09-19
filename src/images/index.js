//pre-loaded, global collection of static image contents

//Todo: get the icons evenly sized where possible
export default {
    notification: { content: require('./notification.png'), width: 43, height: 43 },
    cancelAlert: { content: require('./cancel.png'), width: 36, height: 36 },
    warnAlert: { content: require('./warn.png'), width: 36, height: 36 },
    errorAlert: { content: require('./error.png'), width: 36, height: 36 },
    successAlert: { content: require('./success.png'), width: 36, height: 36 },
    info: { content: require('./info.png'), width: 44, height: 44 },
    review: { content: require('./review.png'), width: 44, height: 44 },
         completed: { content: require('./completed.png'), width: 44, height: 44 },
    completedSelected: { content: require('./completed.png'), width: 44, height: 44 }, //todo: get the completedSelected icon from gfx team
    warnings: { content: require('./warningsSelected.png'), width: 44, height: 44 }, //todo: get the warnings icon from gfx team
    warningsSelected: { content: require('./warningsSelected.png'), width: 44, height: 44 },
     inprogress: { content: require('./inprogress.png'), width: 44, height: 44 },
    inprogressSelected: { content: require('./inprogress.png'), width: 44, height: 44 }, //todo: get the inprogressSelected icon from gfx team
    handshake: { content: require('./handshake.png'), width: 44, height: 44 },
    
};
