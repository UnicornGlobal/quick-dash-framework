<template>
  <div class="uploader-container">
    <file-uploader @progress="updateProgress"
                   @uploaded="uploadImage"
                   @failed="handleFailure"
                   :url="uploadUrl"
                   :name="user.first_name"
                   :validation="validation"
                   :styles="uploaderStyles"
                   previewRadius="180"
                   :instantUpload="false"
                   fieldName="photo"
                   v-model="uploadedFile">
      <template v-slot:preview>
        <avatar
          v-if="user && user.first_name"
          class="item-avatar image-holder"
          size="150"
          font-size="70"
          round
          :image="getAvatarImage"
          :title="user.first_name"
        />
      </template>
      <template v-slot:loading>
        <profile-picture-loader />
      </template>
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

  .item-avatar:hover:after {
    content: "CHANGE";
    position: relative;
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
    top: -156px;
    width: 150px;
    z-index: 3;
    color: white;
  }

  .item-avatar {
    margin: 5px;
    z-index: 2;
  }
</style>

<script>
  import FileUploader from '@unicorns/uploader'
  import Avatar from '@unicorns/avatars'
  import ProfilePictureLoader from '@/components/ProfilePictureLoader'

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
        uploaderStyles: {
          box: {
            width: '180px',
            height: '250px',
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
    computed: {
      getAvatarImage() {
        return process.env.apiUrl + this.user.profile_photo.file_url
      }
    },
    methods: {
      updateProgress(progress) {
        console.log('updating', progress)
        this.progress = progress
      },
      uploadImage(data) {
        this.$toaster.addToast({
          type: 'success',
          message: 'Update Avatar',
          title: 'Success',
          timeout: 5000
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
