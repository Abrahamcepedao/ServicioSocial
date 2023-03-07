interface Project {
    name: string,
    key: string,
    group: string,
    crn: string,
    hours: string,
    inscripcion: string,
    availability: number,
    occupied: number,
    duration: string,
    carrerasList: string[],
    modality: string,
    location: string,
    company: string,
    logoUrl: string,
    uid: string,
    isFav: boolean
}

export default Project