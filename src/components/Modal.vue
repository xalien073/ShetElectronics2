<template>
  <teleport to="#Modal">
    <transition name="modal" mode="out-in">
      <div v-if="Show" @click.self="Close" class="backdrop">
        <div id="modal" @keydown.esc="Close" class="overflow-auto bg-dark">
          <div class="modal-header mb-3">
            <h2 class="modal-title">{{ Title }}</h2>
            <button @click="Close" class="close text-light">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script>
export default {
  name: "Modal",
  emits: ["close"],
  props: ["Title", "Show"],
  methods: {
    Close() {
      this.$emit("close");
    },
  },
};
</script>

<style lang="scss">
.backdrop {
  position: fixed;
  top: 0;
  background: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  z-index: 2;
  transition: .4s;

  #modal {
    max-width: 60vw;
    max-height: 90vh;
    margin: 5vh auto;
    color: #f8f9fa;
    border: 0.1rem solid #dee2e6;
    border-radius: 1rem;
    font-weight: bolder;

    form {
      margin: 0.5rem;

      input {
        color: #f8f9fa;
        background-color: transparent;
        border: 0.1rem solid #f8f9fa;
        font-weight: bolder;
        opacity: 1;
      }
      .zip {
        letter-spacing: 2.4rem;
      }
    }
    p {
      font-size: 3rem;
      font-weight: bolder;
      text-transform: capitalize;
    }

    @media (max-width: 768px) {
      max-width: 98vw;
    }
  }
}

// animation
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: translate(50.5vw, 95vh);
  width: 0;
  height: 0;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.5s ease-in;
}
</style>