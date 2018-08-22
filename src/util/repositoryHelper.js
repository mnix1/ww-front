export function fetchOnPathAndIfNotExists(prevPath, path, targetPath, prevRep, rep ){
    return (path === targetPath && prevPath !== path)
    || (!rep.fulfilled && !rep.pending && prevRep.fulfilled)
}