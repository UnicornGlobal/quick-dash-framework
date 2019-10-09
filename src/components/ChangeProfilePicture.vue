<template>
  <div class="uploader-container">
    <file-uploader @progress="updateProgress"
                   @uploaded="uploadImage"
                   @failed="handleFailure"
                   :url="uploadUrl"
                   :name="user.first_name"
                   :validation="validation"
                   :styles="uploaderStyles"
                   previewRadius="150"
                   v-model="uploadedFile">
      <slot for="avatar-component" #preview-component></slot>
    </file-uploader>
    <progress-bar v-if="uploading" :value="progress" class="progress-bar"></progress-bar>
    <span class="validation-error">
      {{errors.first('global')}}
    </span>
  </div>
</template>

<style lang="scss">
  .uploader-container:hover {
    cursor: pointer;
  }

  .uploader-container:hover:after {
    content: "CHANGE";
    position: absolute;
    background: black;
    width: 100%;
    border-radius: 150px;
    text-align: center;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    font-weight: bold;
    font-size: 2rem;
  }
</style>

<script>
  import FileUploader from '@unicorns/uploader'

  export default {
    components: {
      FileUploader
    },
    props: {
      uploadUrl: {
        type: String,
        required: true
      },
      user: {
        type: Object,
        required: true
      }
    },
    data () {
      return {
        uploadedFile: null,
        validation: {
          rules: {
            required: true,
            mimes: ['image/png', 'image/jpg', 'image/jpeg'],
            size: 8196
          }
        },
        progress: 0,
        uploading: false,
        uploaderStyles: {
          box: {
            width: '150px',
            height: '240px',
            margin: '0.5em'
          },
          preview: {
            width: '150px',
            height: '240px',
            margin: '1rem'
          },
          button: {
            colour: 'green',
            text: 'white',
            disabled: 'lightgrey',
            width: '100px',
            margin: '1rem'
          }
        }
      }
    },
    methods: {
      updateProgress(progress) {
        this.uploading = true
        this.progress = progress
      },
      uploadImage(data) {
        const formData = {
          value: data.title,
          document: data._id
        }

        uploadProfilePhoto(formData)

        return this.$http.post(`${this.uploadUrl}`, formData, {
          onUploadProgress: (event) => {
            console.log(event)
            this.progress = (event.total / event.uploaded) * 100
          }
        }).then((response) => {
          if (response.status !== 422) {
            this.$emit('uploaded', response.data)
          }
          return response
        }).catch((error) => {
          this.handleFailure(error)
          return error
        }).finally(() => {
          this.uploading = false
        })
      },
      handleFailure(error) {
        this.$toaster.addToast({
          type: 'error',
          message: error.message,
          title: 'Error',
          timeout: 5000
        })
      }
    }
  }
</script>
