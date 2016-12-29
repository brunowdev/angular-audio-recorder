
angular.module('GravadorCtrl', []).controller('GravadorController', function ($scope, $location) {

	var mediaConstraints = {
		audio: true
	};

	var mediaRecorder;
	var blobURL;

	function onMediaSuccess(stream) {
		window.streamReference = stream;
		$(function () {

			mediaRecorder = new MediaStreamRecorder(stream);
			mediaRecorder.mimeType = 'audio/wav';
			mediaRecorder.audioChannels = 1;
			mediaRecorder.ondataavailable = function (blob) {
				window.blob = blob;
				// Você pode fazer um POST/PUT "Blob" usando FormData/XHR2
				blobURL = URL.createObjectURL(blob);
				$("#result").append('<audio controls src="' + blobURL + '"></audio><br><a href="' + blobURL + '" target="_blank">' + blobURL + '</a><br><br>');
			};
			mediaRecorder.start(5000 * 5000);
			setTimeout(function () {
				mediaRecorder.stop();
			}, 120 * 1000);

		});
	}

	function onMediaError(e) {
		console.error('media error', e);
	}

	function onStop() {
		mediaRecorder.stop();
		mediaRecorder.stream.stop();
	}

	$(function () {

		$(".play").on("click", function () {
			navigator.getUserMedia(mediaConstraints, onMediaSuccess, onMediaError);
		});

		$(".stop").on("click", function () {
			mediaRecorder.stop();

			if (window.streamReference) {
				window.streamReference.getAudioTracks().forEach(function (track) {
					track.stop();
				});

				window.streamReference.getVideoTracks().forEach(function (track) {
					track.stop();
				});

				window.streamReference = null;
			}
		});

		$(".resume").on("click", function () {
			mediaRecorder.resume();
		});

		$(".salvar").on("click", function () {
			mediaRecorder.save();
		});

	});


});