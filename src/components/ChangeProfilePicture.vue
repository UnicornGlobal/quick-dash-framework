<template>
  <div class="uploader-container">
    <file-uploader @progress="updateProgress"
                   @uploaded="uploadImage"
                   @failed="handleFailure"
                   :url="uploadUrl"
                   :name="name"
                   :validation="validation"
                   :styles="uploaderStyles"
                   :previewRadius="round ? 150 : 10"
                   :instantUpload="true"
                   :buttonless="true"
                   :fieldName="fieldName"
                   v-model="uploadedFile">
      <template v-slot:preview>
        <avatar
          v-if="name"
          :class="'item-avatar image-holder change-profile-avatar ' + (round ? 'round-150' : 'round-10')"
          size="150"
          :radius="round ? 150 : 10"
          round
          font-size="70"
          :image="image"
          :title="name"
        />
      </template>
      <slot name="loading">
        <profile-picture-loader />
      </slot>
    </file-uploader>
    <span class="validation-error">
      {{errors.first('global')}}
    </span>
  </div>
</template>

<style lang="scss">
  .uploader-container {
    width: 180px;
    height: 180px;
  }
  .uploader-container:hover {
    cursor: pointer;
  }

  .change-profile-avatar:hover:after {
    content: "CHANGE";
    position: relative;
    background: black;
    width: 100%;
    text-align: center;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0.8;
    font-weight: bold;
    font-size: 2rem;
    top: -156px;
    width: 150px;
    z-index: 3;
    color: white;
  }

  .round-10:hover:after {
    border-radius: 10px;
  }

  .round-150:hover:after {
    border-radius: 150px;
  }

  .change-profile-avatar {
    margin: 5px;
    z-index: 2;

    .avatar {
      height: 156px !important;
    }
  }

  .validation-error {
    width: 300px;
  }
</style>

<script>
  import FileUploader from '@unicorns/uploader'
  import Avatar from '@unicorns/avatars'
  import ProfilePictureLoader from '@/components/ProfilePictureLoader'
  import { reloadSelf } from '@/auth'

  export default {
    components: {
      FileUploader,
      Avatar,
      ProfilePictureLoader
    },
    props: {
      uploadUrl: {
        type: String,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      round: {
        type: Boolean,
        required: false,
        default: true
      },
      image: {
        type: String,
        required: false,
        default: null
      },
      fieldName: {
        type: String,
        required: false,
        default: 'photo'
      }
    },
    data () {
      return {
        uploadedFile: null,
        validation: {
          rules: {
            required: true,
            mimes: ['image/png', 'image/jpg', 'image/jpeg'],
            size: 4096
          }
        },
        progress: 0,
        uploaderStyles: {
          box: {
            width: '180px',
            height: '180px',
            margin: '0em'
          },
          preview: {
            width: '180px',
            height: '180px',
            margin: '0',
            border: '10px solid white'
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
        this.progress = progress
      },
      uploadImage(data) {
        this.$toaster.addToast({
          type: 'success',
          message: 'Image upload successful',
          title: 'Success',
          timeout: 5000
        })
        reloadSelf()
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
