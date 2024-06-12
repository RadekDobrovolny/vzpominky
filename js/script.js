let nextMemoryButton = document.getElementById('next-memory-button');

nextMemoryButton.addEventListener('click', function () {
    setMemory();
});

document.addEventListener('DOMContentLoaded', function () {
    setMemory();
});

let history = JSON.parse(localStorage.getItem('history')) || [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1];

function setMemory() {
    $.getJSON('js/memories.json', function (data) {

        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);
        const memory = +urlParams.get('vzpominka');

        let index = -1;
        if (memory > 0 && memory <= data.memories.length) {
            index = memory - 1;
        } else {
            index = Math.floor(Math.random() * data.memories.length);
            while (history.includes(index)) {
                index = Math.floor(Math.random() * data.memories.length);
            }
            history.shift();
            history.push(index);
            localStorage.setItem('history', JSON.stringify(history));
        }

        let assetDiv = document.querySelector('.asset');

        assetDiv.innerHTML = '';

        if (data.memories[index].type === "image") {
            let img = document.createElement('img');
            img.id = 'image';
            img.src = 'assets/' + data.memories[index].asset;
            img.alt = data.memories[index].title;

            assetDiv.appendChild(img);
        }

        if (data.memories[index].type === "youtube") {
            let iframe = document.createElement('iframe');
            iframe.src = data.memories[index].asset;

            assetDiv.appendChild(iframe);
        }

        if (data.memories[index].type === "audio") {
            let audioElement = document.createElement('audio')

            let asset = 'assets/' + data.memories[index].asset;
            audioElement.setAttribute('src', asset);
            audioElement.setAttribute('type', 'audio/mpeg');
            audioElement.setAttribute('controls', 'true');
            audioElement.setAttribute('preload', 'auto');

            assetDiv.appendChild(audioElement);
        }

        if (data.memories[index].type === "html") {

            $(document).ready(function () {
                $('.asset').load('assets/' + data.memories[index].asset);
            });
        }

        if (data.memories[index].type === "gallery") {

            $(document).ready(function () {
                $('.asset').load('assets/' + data.memories[index].asset);
            });
        }

        document.getElementById("title").innerHTML = data.memories[index].title;

    });
}
