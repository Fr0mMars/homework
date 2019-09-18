ymaps.ready(function () {
    var map = new ymaps.Map('map', {
            center: [48.792947, 132.920245],
            zoom: 14,
            controls: []
        });
    map.behaviors.disable([
        'scrollZoom'
    ]);

    map.controls.add('zoomControl');
    let storage = sessionStorage;
        if (storage.Review) {
            storage.clear();
        }

    let customItemContentLayout = ymaps.templateLayoutFactory.createClass(
        '<h3 class=ballon_header>{{ properties.balloonContentHeader|raw }}</h3>' +
            '<div class=ballon_body>{{ properties.balloonContentBody|raw }}</div>'+ '<br>' +
            '<div class=ballon_footer>{{ properties.balloonContentFooter|raw }}</div>'
    );

    let clusterer = new ymaps.Clusterer({
        clusterDisableClickZoom: true,
        clusterOpenBalloonOnClick: true,
        clusterBalloonContentLayout: 'cluster#balloonCarousel',
        clusterBalloonItemContentLayout: customItemContentLayout,
        clusterBalloonPanelMaxMapArea: 0,
        clusterBalloonContentLayoutWidth: 320,
        clusterBalloonContentLayoutHeight: 240,
        clusterBalloonPagerSize: 5
    });

    let placemarks = [];
    let coords;

    map.events.add('click', function (e) {
        coords = e.get('coords');
        getAddress(coords);
    });

    function getAddress(coords, cluster = 0) {
        ymaps.geocode(coords).then(function (res) {
            let firstGeoObject = res.geoObjects.get(0);
            let address = firstGeoObject.getAddressLine();
            let reviewTexts;
            let place;

            let MyballoonContentLayoutClass = ymaps.templateLayoutFactory.createClass(
                '<div class ="review" style="width: 380px; height: 530px;overflow: visible">' +
                    '<div class = "review__title" style="display: flex; align-items: center;' +
                        'width: 380px; height: 45px; background-color: #ff8663; border-top-left-radius: 15px;' +
                        'border-top-right-radius: 15px">' +
                        '<img class="title__img" src="../image/marker1.png" style="width: 10px; height: 15px;' +
                         'margin-left: 10px">' +
                        '<div class = "title__address" style="display: flex; justify-content: space-between;' +
                         'align-items: center; width: 350px; padding-left: 10px; padding-right: 10px ">' +
                            '<p class = "title__tex">' + address + '</p>' +
                            '<img class = "title__cross" src="../image/cross1.png">' +
                        '</div>' +
                    '</div>' +
                    '<div class = "review__text" style="width: 380px; height: 160px; overflow-y: auto">' +
                    '</div>' +
                    '<form id = "Review" name = "youReview" >' +
                        '<div class = "youReview_title" style="color: #ff8663; "> ВАШ ОТЗЫВ </div>' +
                        '<input name = "rname" type="text" placeholder="Ваше имя" style="width: 360px; height: 30px;' +
                         'margin-top: 15px; border-radius: 20px; padding-left: 15px; border: 1px solid #c4c4c4;' +
                         'font-size: 16px; ">' +
                        '<input name = "rlocal" type="text" placeholder="Укажите место" style="width: 360px;' +
                         'height: 30px; border-radius: 20px; padding-left: 15px; border: 1px solid #c4c4c4;' +
                         'font-size: 16px; margin-top: 15px">' +
                        '<textarea  name= "rtext" placeholder="Поделитесь впечатлениями" style="width: 360px;' +
                        'height: 130px; border-radius: 20px; padding-left: 15px; border: 1px solid #c4c4c4;' +
                        'font-size: 16px; margin-top: 15px">' + '</textarea>' +
                        '<input type="submit" value = "Добавить" style="width: 88px; background-color: #ff8663;' +
                         'height: 33px; border-radius: 20px; margin-left: 292px; font-size: 14px; margin-top: 15px;' +
                         'border: 1px solid #ff8663">' +
                    '</form>' +
                '</div>', {
                    build: function () {
                        MyballoonContentLayoutClass.superclass.build.call(this);
                        let Review = document.querySelector('.review');
                        let reviewText = document.querySelector('.review__text');
                        let texts = reviewText.innerHTML;
                        let ArrayObj =[];
                        let Obj ={};
                        let address = firstGeoObject.getAddressLine();

                    if (storage.Review) {
                            ArrayObj = JSON.parse(storage.Review);
                            if (ArrayObj.length) {
                                for (let i = 0; i < ArrayObj.length; i++) {
                                    if (ArrayObj[i].address === address) {
                                        texts = texts + '<b>' + ArrayObj[i].name + '</b>' + ' ' +
                                        ArrayObj[i].local + '<br>' + ArrayObj[i].text + '<br>';
                                        reviewText.innerHTML = texts;
                                        reviewTexts = reviewText.innerText;
                                    }
                                }
                            }
                        }

                        Review.addEventListener('click', function (e) {

                            if (e.target.className === 'title__cross') {
                                map.balloon.close();
                            }
                            if (e.target.type === 'submit') {
                                let rname, rlocal, rtext, address;

                                let elForm =e.target.parentElement;

                                for (let i = 0; i < elForm.children.length; i++ ) {
                                    if (elForm.children[i].name === 'rname') {
                                        rname = elForm.children[i].value;
                                    }
                                    if (elForm.children[i].name === 'rlocal') {
                                        rlocal = elForm.children[i].value;
                                    }
                                    if (elForm.children[i].name === 'rtext') {
                                        rtext = elForm.children[i].value;
                                    }
                                }
                                address = firstGeoObject.getAddressLine();
                                Obj = { address: address, name: rname, local: rlocal, text: rtext };
                                ArrayObj.push(Obj);
                                storage.Review = JSON.stringify(ArrayObj);
                                reviewText = e.target.parentElement.parentElement.childNodes[1];
                                texts = texts + '<b>' + rname + '</b>' + ' ' + rlocal + '<br>' + rtext + '<br>';
                                reviewText.innerHTML = texts;
                                reviewTexts = reviewText.innerText;

                                ArrayObj = JSON.parse(storage.Review);
                                let counterMark =0;

                                for (let i = 0; i < ArrayObj.length; i++) {
                                    if (ArrayObj[i].address === address && counterMark === 0 && cluster === 0) {
                                        counterMark = counterMark +1;
                                        reviewTexts = ArrayObj[i].text;
                                        let place = ArrayObj[i].local;
                                        placemark.properties.set({
                                            balloonContentHeader: place,
                                            balloonContentFooter: reviewTexts
                                        });
                                        placemarks.push(placemark);
                                        clusterer.add(placemarks);
                                        map.geoObjects.add(clusterer);
                                    }
                                }
                                e.preventDefault();
                            }
                        });
                    }
                });
            map.balloon.open([coords[0], coords[1]], address, {
                contentLayout: MyballoonContentLayoutClass,
                closeButton: false,
                maxHeight: 530,
                maxWidth: 380
            });
            let placemark = new ymaps.Placemark([coords[0], coords[1]], {
                balloonContentHeader: place,
                balloonContentBody: '<a href = "#">' +address + '</a>',
                balloonContentFooter: reviewTexts
            },
                {
                    balloonContentLayout: MyballoonContentLayoutClass,
                    balloonMaxHeight: 530,
                    balloonMaxWidth: 380,
                    balloonPanelMaxMapArea: 0,
                    balloonCloseButton: false
                }
        );

        clusterer.balloon.events.add('click', function (e) {
            let clastererLink = document.querySelector('.ballon_body');
            clastererLink = clastererLink.innerText;
            ymaps.geocode(clastererLink).then(function (res) {
                let coordsAddress = res.geoObjects.get(0).geometry.getCoordinates();
                getAddress(coordsAddress, cluster = 1);
            });
        });
    });
  }

    clusterer.balloon.open(clusterer.getClusters()[0]);
});