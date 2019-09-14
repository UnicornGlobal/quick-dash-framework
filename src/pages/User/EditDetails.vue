<template>
  <page-container class="page-container">
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
      font-size: 1.2rem;
    }
  }

</style>

<script>
  import FormGroup from '@/components/Form/FormGroup'
  import PageContainer from '@/components/Containers/PageContainer.vue'

  import { changeUserDetails } from '@/api/user'

  export default {
    components: {
      FormGroup,
      PageContainer
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
            console.log(e)
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
        console.log(user)
        return user
      },
      userDetails() {
        const user = this.$store.getters['auth/user']

        console.log(user)
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
