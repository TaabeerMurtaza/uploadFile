const form = document.getElementById('main_form')
const input = document.getElementById('id_file')
const pbar = document.getElementById('progressbar')
const alert_box = document.getElementById('alert_box')
const cancel = document.getElementById('cancel_btn')
const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value

input.addEventListener('change', ()=> {
    pbar.classList.remove('d-none')
    cancel.classList.remove('d-none')


    const img_data = input.files[0]
    const fd = new FormData()

    fd.append('csrfmiddlewaretoken', csrf)
    fd.append('file', img_data)

    $.ajax({
        type:'POST',
        url:form.action,
        enctype:'multipart/form-data',
        data: fd,
        beforeSend: function () {
            alert_box.innerHTML = ''

        },
        xhr: function () {
            const xhr = new window.XMLHttpRequest();
            xhr.upload.addEventListener('progress', e=>{
                // console.log(e)
                if (e.lengthComputable){
                    const percent = e.loaded / e.total * 100
                    pbar.innerHTML = `<div class="progress">
                              <div class="progress-bar" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100" style="width:${percent.toFixed(0)}%""></div>
                            </div><p>${percent.toFixed(1)}%</p>`

                    console.log(percent)
                }
            })

            cancel.addEventListener('click', e=>{
                xhr.abort()
                setTimeout(()=> {
                    form.reset()

                    pbar.classList.add('d-none')
                    cancel.classList.add('d-none')
                    alert_box.innerHTML = '<div class="alert alert-danger text-center" role="alert">File sending Canceled!</div>'
                    alert_box.classList.remove('d-none')

                }, 500)

                pbar.innerHTML = ''
                cancel.classList.add('d-none')
            })

            return xhr
        },
        success: function (response) {
            console.log(response)
            alert_box.innerHTML = '<div class="alert alert-success text-center" role="alert">File Successfully Uploaded!</div>'
            alert_box.classList.remove('d-none')

            // Hiding back the cancel btn and progressbar
            pbar.classList.add('d-none')
            cancel.classList.add('d-none')
        },
        error: function (error) {
            console.log(error)
        },
        cache: false,
        contentType: false,
        processData: false,

    })
})


