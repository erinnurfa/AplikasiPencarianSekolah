// cari mahasiswa
const baseUrl = "https://api-sekolah-indonesia.herokuapp.com";

const cariSekolah = async (keyword, page) => {
    const response = await fetch(`${baseUrl}/sekolah/s?sekolah=${keyword}&page=${page}&perPage=10`);
    const responseJson = await response.json();
    return responseJson;
}

const getBadgeColor = (bentuk) => {
    let color = '';
    switch (bentuk) {
        case 'SMA':
            color = 'bg-primary';
            break;
        case 'SMK':
            color = 'bg-info';
            break;
        case 'SMP':
            color = 'bg-success';
            break;
        case 'SD':
            color = 'bg-warning';
            break;
        default:
            color = 'bg-dark';
            break;
    }
    return color;
}

export { cariSekolah, getBadgeColor };