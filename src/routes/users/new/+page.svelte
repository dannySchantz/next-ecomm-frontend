<script>
    import  { PUBLIC_BACKEND_BASE_URL }  from '$env/static/public';
    import { goto } from '$app/navigation';
    import { logInUser, loggedIn } from './../../../utils/auth.js';
    import { writable } from 'svelte/store';
	  import { onMount } from 'svelte';


    let formErrors = {};
    let isLoading = false;
    let showAlert = writable(false);
    export let currentUserId = ''

    onMount(setShowAlertFalse)
    onMount(checkLoggedIn)

    function goToHomePage() {
        goto('/')
    }
    function checkLoggedIn() {
      if ($loggedIn && !$showAlert) {
        goto('/');
        alert('You are already logged-in, no need to signup :p')
      }
    }
    function setShowAlertFalse() {
        showAlert.set(false)
    }


    async function createUser(evt) {
      evt.preventDefault()
      isLoading = true
      if (evt.target['password'].value != evt.target['password-confirmation'].value) {
        formErrors['password'] = { message: 'Password confirmation does not match' };
        return;
      }
      
      const userData = {
        name: evt.target['name'].value,
        email: evt.target['email'].value,
        password: evt.target['password'].value,
        // passwordConfirm: evt.target['password-confirmation'].value
      };
      
      const resp = await fetch(PUBLIC_BACKEND_BASE_URL + '/users', {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (resp.status == 200) {
        const res = await logInUser(userData.email, userData.password);
        currentUserId = resp.id
        if (res.success) {
          isLoading = false
          loggedIn.set(true)
          showAlert.set(true)
        //   postSignUp();
        } else {
          isLoading = false
          loggedIn.set(false)
          throw 'Sign up succeeded but authentication failed';
        }
      } else {
        const res = await resp.json();
        formErrors = res.data;
      }
    }
    </script>
  <!-- {#if } -->
  <!-- <div class="alert alert-info shadow-l flex justify-start">
      <svg aria-hidden="true" class="flex-shrink-0 inline w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>    </svg>
    <p class="justify-left">Please sign up first.</p>
  </div> -->
    <!-- {/if} -->
{#if $showAlert}
<div class="justify-center grid grid-cols-1 grid-rows-2">
  <div class="alert alert-success mx-4 max-h-20 rounded-xl mt-4 w-auto row-span-1 flex flex-col items-center">
    <span><strong>Thank you for signing up!</strong></span>
    <span class="font-extralight ">Please check your email for confirmation.</span>
  </div>

<button  on:click={goToHomePage} class="btn w-1/3 flex justify-self-center h-20 mx-4 rounded-xl mt-[10%] row-span-1">Click here to return to home</button>
</div>
{:else}
    <h1 class="text-center text-xl mt-20 text-primary">Please create your account.</h1>
    <div class="text-center">
      <a class="link-hover italic text-xs text-primary" href="/auth">Already have an account? Click here to login instead.</a>
    </div>
    <div class="flex justify-center items-center text-primary">
      <form on:submit={createUser} class="w-full m-12">
        <div class="form-control w-full">
          <label class="label" for="name">
            <span class="label-text text-primary">Name</span>
          </label>
          <input type="text" name="name" placeholder="johndoe" class="input input-bordered w-full" />
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="email">
            <span class="label-text text-primary">Email</span>
          </label>
          <input type="email" name="email" placeholder="john@example.com" class="input input-bordered w-full" required />
          {#if 'email' in formErrors}
          <label class="label" for="email">
            <span class="label-text-alt text-red-500">{formErrors['email'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text text-primary">Password</span>
          </label>
          <input type="password" name="password" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        <div class="form-control w-full">
          <label class="label" for="password">
            <span class="label-text text-primary">Confirm Password</span>
          </label>
          <input type="password" name="password-confirmation" placeholder="" class="input input-bordered w-full" required />
          {#if 'password' in formErrors}
          <label class="label" for="password">
            <span class="label-text-alt text-red-500">{formErrors['password'].message}</span>
          </label>
          {/if}
        </div>
        
        {#if isLoading}
            <div class ="flex justify-center shadow-l">
                <svg aria-hidden="true" class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
            </div>
        {/if}
        <button class="btn btn-md btn-primary w-full mt-4 rounded-xl" disabled={isLoading}>Create An Account</button>
    </form>
      <script type="module" src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.esm.js"></script>
      <script nomodule src="https://unpkg.com/ionicons@7.1.0/dist/ionicons/ionicons.js"></script>
    </div>
{/if}
    