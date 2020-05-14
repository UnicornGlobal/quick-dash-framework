<template>
  <page-container class="page-container">
    <change-profile-picture
      :cropping="{enabled: true, shape: 'round', minHeight: 250, minWidth: 250, maxHeight: 5000, maxWidth: 5000}"
      :name="user.first_name"
      :upload-url="uploadUrl"
      :round="true"
      :image="profileImage"
      style="margin: 0 2rem;"
    ></change-profile-picture>
    <div class="edit-section">
      <h3>General</h3>
      <div>
          <label>Email</label>
          <input v-validate="'required'" v-model="user.email" name="email" type="text" disabled
                 placeholder="" />
          <span v-if="errors.has('email')" class="validation-error">{{errors.first('email')}}</span>
          <label>First Name</label>
          <input v-validate="'required'" v-model="user.first_name" name="first_name" placeholder=""/>
          <span v-if="errors.has('first_name')" class="validation-error">{{errors.first('first_name')}}</span>
          <label>Last Name</label>
          <input v-validate="'required'" v-model="user.last_name" name="last_name" placeholder=""/>
          <span v-if="errors.has('last_name')" class="validation-error">{{errors.first('last_name')}}</span>
          <label>Mobile</label>
          <input v-validate="'required'" v-model="user.mobile" name="mobile" placeholder=""/>
          <span v-if="errors.has('mobile')" class="validation-error">{{errors.first('mobile')}}</span>
        </div>
      <form-group class="full-width bottom-button">
        <button @click.prevent="save" class="button button-positive">Save Changes</button>
      </form-group>
    </div>
  </page-container>
</template>

<style lang="scss" scoped>
  .link-container {
    display: flex;
    justify-content: flex-end;
  }

  .section-divider {
    border-bottom: none;
  }

  .edit-section {
    padding: 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 1024px) {
      width: 100%;
    }

    h3 {
      align-self: flex-start;
      color: $form_header_colour;
      font-weight: bold;
      font-size: 1.5rem;
    }
  }

</style>

<script>
  import FormGroup from '@/components/Form/FormGroup'
  import PageContainer from '@/components/Containers/PageContainer.vue'

  import { changeUserDetails } from '@/api/user'
  import ChangeProfilePicture from '@/components/ChangeProfilePicture'

  export default {
    components: {
      FormGroup,
      PageContainer,
      ChangeProfilePicture
    },
    data() {
      return {
        uploadUrl: `${process.env.apiUrl}/api/upload/photo`
      }
    },
    methods: {
      async save() {
        const valid = await this.$validator.validateAll()
        if (!valid) {
          return false
        }

        const vm = this
        return changeUserDetails(this.user._id, {
          firstName: this.user.first_name,
          lastName: this.user.last_name,
          mobile: this.user.mobile
        })
          .then(res => {
            vm.$toaster.addToast({
              type: 'success',
              title: 'Success',
              message: 'User was successfully updated.'
            })
          })
          .catch(e => {
            vm.$toaster.addToast({
              type: 'error',
              title: 'Error',
              message: 'There was a problem editing the User.'
            })
          })
      }
    },
    computed: {
      user() {
        const user = this.$store.getters['auth/user']
        return user
      },
      profileImage () {
        if (this.user.profile_photo && this.user.profile_photo.file_url) {
          if (this.user.profile_photo.file_url.match(/^https?:\/\//)) {
            return this.user.profile_photo.file_url
          }

          return process.env.apiUrl + this.user.profile_photo.file_url
        }

        return ''
      },
      userDetails() {
        const user = this.$store.getters['auth/user']

        return [
          {
            key: 'First Name',
            value: user.first_name || '-'
          },
          {
            key: 'Last Name',
            value: user.last_name || '-'
          },
          {
            key: 'Email',
            value: user.email || '-'
          },
          {
            key: 'Mobile',
            value: user.mobile || '-'
          },
          {
            key: 'User ID',
            value: user._id || '-'
          }
        ]
      }
    }
  }
</script>
