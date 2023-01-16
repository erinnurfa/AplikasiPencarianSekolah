// import * as bootstrap from 'bootstrap';
import './style/style.scss';
import './components/nav-custom';

import Masonry from 'masonry-layout';

import { cariSekolah, getBadgeColor } from './helper';

window.addEventListener('DOMContentLoaded', () => {
    const listMHS = document.querySelector('.listMHS');
    const btnSubmit = document.querySelector('#btnSubmit');
    const nama = document.querySelector('#nama');

    const pagingWrapper = document.querySelector('#pagingWrapper');
    const btnPrev = document.querySelector('#btnPrev');
    const btnNext = document.querySelector('#btnNext');
    const totalData = document.querySelector('#total_data');

    let currentPage = 1;

    btnSubmit.addEventListener('click', () => {
        const keyword = nama.value;
        listMHS.innerHTML = '';

        cariSekolah(keyword, 1).then(response => {
            if (response.status === 'success') {
                totalData.innerHTML = ` ${response.total_data} Data ditemukan `;
                
                response.dataSekolah.forEach(sekolah => {
                    renderSekolah(sekolah);
                });
                
                if (response.total_data > response.dataSekolah.length) {
                    pagingWrapper.classList.remove('d-none');

                    if (currentPage > 1) {
                        btnPrev.classList.remove('disabled');
                    } else {
                        btnPrev.classList.add('disabled');
                    }

                    btnNext.addEventListener('click', () => {
                        currentPage++;
                        
                        cariSekolah(keyword, currentPage).then(response => {
                            if (response.status === 'success') {
                                listMHS.innerHTML = '';
                                response.dataSekolah.forEach(sekolah => {
                                    renderSekolah(sekolah);
                                });
                            }
                        }).then(() => {
                            checkPage(Math.ceil(response.total_data / response.dataSekolah.length));
                        });
                    });

                    btnPrev.addEventListener('click', () => {
                        currentPage--;
                        
                        cariSekolah(keyword, currentPage).then(response => {
                            if (response.status === 'success') {
                                listMHS.innerHTML = '';
                                response.dataSekolah.forEach(sekolah => {
                                    renderSekolah(sekolah);
                                });
                            }
                        }).then(() => {
                            checkPage(Math.ceil(response.total_data / response.dataSekolah.length));
                        });
                    });

                } else {
                    pagingWrapper.classList.add('d-none');
                }

            } else {
                listMHS.innerHTML += `
                    <div class="col-md-12 mb-3">
                        <div class="card card-body shadow-lg bg-secondary">
                            <h4 class="fw-bold text-center">${response.message}</h4>
                        </div>
                    </div>
                `;
            }
        });

        const checkPage = (_max_page) => {
            console.log(currentPage);
            if (currentPage > 1) {
                btnPrev.classList.remove('disabled');
            } else {
                btnPrev.classList.add('disabled');
            }
        }
        
        const renderSekolah = (sekolah) => {
            let html = '';
            
            html = `
                <div class="col-md-6 mb-3">
                    <div class="card card-body shadow-lg bg-secondary">
                        <p class="fw-bold lead">${sekolah.sekolah} <span class="badge ${getBadgeColor(sekolah.bentuk)}">${sekolah.bentuk}</span></p>
                        <p>Alamat : ${sekolah.alamat_jalan}, ${sekolah.kecamatan} ${sekolah.kabupaten_kota} ${sekolah.propinsi}</p>
                    </div>
                </div>
            `;
            
            listMHS.innerHTML += html;


            const msnry = new Masonry('.listMHS', {
                itemSelector: '.col-md-6',
                columnWidth: '.col-md-6',
                percentPosition: true,
            });

            msnry.layout();
        }
    });
});