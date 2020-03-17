actions.querySelector('.docs-buttons').onclick = function(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    var cropped;
    var result;
    var input;
    var data;

    if (!cropper) {
        return;
    }

    while (target !== this) {
        if (target.getAttribute('data-method')) {
            break;
        }

        target = target.parentNode;
    }

    if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
        return;
    }

    data = {
        method: target.getAttribute('data-method'),
        target: target.getAttribute('data-target'),
        option: target.getAttribute('data-option') || undefined,
        secondOption: target.getAttribute('data-second-option') || undefined
    };

    cropped = cropper.cropped;

    if (data.method) {
        if (typeof data.target !== 'undefined') {
            input = document.querySelector(data.target);

            if (!target.hasAttribute('data-option') && data.target && input) {
                try {
                    data.option = JSON.parse(input.value);
                } catch (e) {
                    console.log(e.message);
                }
            }
        }

        switch (data.method) {
            case 'rotate':
                if (cropped && options.viewMode > 0) {
                    cropper.clear();
                }

                break;

            case 'getCroppedCanvas':
                try {
                    data.option = JSON.parse(data.option);
                } catch (e) {
                    console.log(e.message);
                }

                if (uploadedImageType === 'image/jpeg') {
                    if (!data.option) {
                        data.option = {};
                    }

                    data.option.fillColor = '#fff';
                }

                break;
        }

        result = cropper[data.method](data.option, data.secondOption);

        switch (data.method) {
            case 'rotate':
                if (cropped && options.viewMode > 0) {
                    cropper.crop();
                }

                break;

            case 'scaleX':
            case 'scaleY':
                target.setAttribute('data-option', -data.option);
                break;

            case 'getCroppedCanvas':
                if (result) {
                    // Bootstrap's Modal
                    $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

                    if (!download.disabled) {
                        download.download = uploadedImageName;
                        download.href = result.toDataURL(uploadedImageType);
                    }
                }

                break;

            case 'destroy':
                cropper = null;

                if (uploadedImageURL) {
                    URL.revokeObjectURL(uploadedImageURL);
                    uploadedImageURL = '';
                    image.src = originalImageURL;
                }

                break;
        }

        if (typeof result === 'object' && result !== cropper && input) {
            try {
                input.value = JSON.stringify(result);
            } catch (e) {
                console.log(e.message);
            }
        }
    }
}