<script>
    import { logOut, loggedIn } from "../utils/auth";
    import { goto } from '$app/navigation';

    export function navigateToHomePage() {
      goto('/');
    }
  
    function navigateToLoginPage() {
      goto('/auth')
    }
    function navigateToSignUp() {
        goto('/users/new')
    }
  
  </script>
    
  <header class="flex justify-between items-center bg-primary p-2">
    <button class="btn btn-ghost rounded-lg normal-case text-xl text-primary-content" on:click={navigateToHomePage}>NEXT Academy</button>
    <div> 
        <div class="flex gap-2 items-center">
            <!-- <button class="btn rounded-lg btn-ghost text-primary-content" on:click={navigateToSignUp}>Sign Up</button> -->
            {#if $loggedIn}
            <button class="btn rounded-lg btn-ghost text-primary-content" on:click={logOut}>Sign Out</button>
            {:else}
            <button class="btn rounded-lg btn-ghost text-primary-content" on:click={navigateToSignUp}>Sign Up</button>
            <button class="btn rounded-lg btn-ghost text-primary-content" on:click={navigateToLoginPage}>Sign In</button>
            {/if}
        </div>
    </div>
  </header>
    
  
  
  
  