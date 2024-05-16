let nextMemoryButton = document.getElementById('next-memory-button');

nextMemoryButton.addEventListener('click', function () {
    setMemory();
});

document.addEventListener('DOMContentLoaded', function () {
    setMemory();
});

function setMemory() {
    $.getJSON('js/memories.json', function (data) {
        let index = Math.floor(Math.random() * data.memories.length);
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
            iframe.width = 700;
            iframe.height = 500;
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

        document.getElementById("title").innerHTML = data.memories[index].title;

    });
}
