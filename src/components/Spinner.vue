<template>
    <div 
        v-if="loading" 
        class="spinner-overlay"
    >
        <div 
            class="spinner"
        />
    </div>
</template>
  
<script>
export default {
    name:'SpinnerV',
    props: {
        loading: Boolean,
    },
};
</script>
  
  <style scoped>
  .spinner-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.3);
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  </style>
  