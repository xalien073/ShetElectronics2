<template>
  <div class="truck">
    <div class="cabin">
      <div class="right-window">
        <div class="mirror"></div>
      </div>
      <div class="left-window">
        <div class="mirror"></div>
      </div>
      <div class="tire">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="back"></div>
      </div>
    </div>
    <div class="truck-container">
      <div class="container-left">
      </div>
      <div class="container-back">
        <div class="truck-door">
          <strong>Shet.com</strong>
        </div>
      </div>
      <div class="container-right">
      </div>
      <div class="tire">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        <div class="back"></div>
      </div>
      <div class="tire">
        <!-- <span></span>
        <span></span>
        <span></span>
        <span></span> -->
        <div class="back"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style lang="scss">
  $tire-clr: #000;
  $truck-clr: linear-gradient(purple, blueviolet, purple);
  $truck-brd-clr: blueviolet;
  $mirror-clr: skyblue;
  $tire-z: 10vw;

  @mixin rotation ($t-z) {
    @keyframes rotate-tire {
        to {
          transform: translateZ($t-z) rotate(180deg) translateX(0rem) rotateY(0deg);
        }
      }
  }

  @mixin rotate-tire ($t-z) {
    animation: rotate-tire 2.5s linear 1;
    @include rotation($t-z)
  }

  @mixin rotate-turn-tire($t-z) {
    animation:  rotate-tire 2.5s linear 1,
    turn-tire 7s 2.5s linear 1;
    @include rotation($t-z);

    @keyframes turn-tire {
        0% {
          transform: translateZ($tire-z) rotate(180deg) translateX(-.5rem) rotateY(0deg);
        }

        25% {
          transform: translateZ($tire-z) rotate(180deg) translateX(-.5rem) rotateY(-15deg);
        }

        50% {
          transform: translateZ($tire-z) rotate(180deg) translateX(-.5rem) rotateY(-30deg);
        }

        90% {
          transform: translateZ($tire-z) rotate(180deg) translateX(-.5rem) rotateY(-45deg);
        }

        100% {
          transform: translateZ($tire-z) rotate(180deg) translateX(-.5rem) rotateY(0deg);
        }
      }
  }

  .truck {
    width: 40vw;
    height: 40vh;
    position: relative;
    left: 0vw;
    transform-style: preserve-3d;
    animation: drive 2.5s linear forwards 1,
    rotate-truck 8s 2.5s linear forwards 1,
    far-truck 7s 9.5s linear forwards 1
    ;
    @keyframes drive {
      to {
        transform: translateX(30vw);
      }
    }
    @keyframes rotate-truck {
      to { transform:  translateX(30vw) rotateY(90deg);}
    }
    @keyframes far-truck {
      to {transform:  
      translateX(30vw) rotateY(90deg)
      translateY(7vw);}
    }

    .truck-container,
    .truck-door,
    .container-back,
    .container-left,
    .container-right,
    .cabin,
    .cabin::before,
    .cabin::after {
      position: absolute;
      height: 100%;
      background: $truck-clr;
    }

    .truck-container,
    .container-left,
    .container-right {
      width: 100%;
    }

    .truck-container,
    .container-back,
    .cabin,
    .right-window,
    .left-window,
    .container-left,
    .container-right {
      transform-style: preserve-3d;
    }

    .tire,
    .back {
      transform-style: preserve-3d;
    }

    .tire {
      width: 6rem;
      height: 6rem;
      background: $tire-clr;
      border-radius: 50%;
      border: .3rem outset hsl(206, 21%, 94%);
      position: absolute;
      bottom: -10%;
      display: grid;
      place-items: center;

      &::before {
        content: "";
        position: absolute;
        height: 70%;
        width: 70%;
        background: hsl(206, 21%, 94%);
        border-radius: 50%;
        border: .4rem inset #0005;
      }

      span {
        position: absolute;
        height: .6rem;
        width: .6rem;
        background: #fff5;
        border-radius: 50%;
        border: .2rem outset #0009;
        transform: translateX(-50%) translateY(-50%);
      }

      span:nth-child(1),
      span:nth-child(2) {
        top: 40%;
      }

      span:nth-child(1) {
        left: 40%;
      }

      span:nth-child(2) {
        left: 60%;
      }

      span:nth-child(3),
      span:nth-child(4) {
        top: 60%;
      }

      span:nth-child(3) {
        left: 40%;
      }

      span:nth-child(4) {
        left: 60%;
      }

      .back {
        position: absolute;
        width: 100%;
        height: 100%;
        background: $tire-clr;
        display: grid;
        place-items: center;
        border-radius: 50%;
        transform: translateZ(-3rem);

        &::before {
          content: "";
          position: absolute;
          width: 50%;
          height: 100%;
          border-radius: .25rem;
          background: $tire-clr;
          transform-origin: right;
          transform: rotateY(90deg) translateZ(-.7rem);
          animation: tire-far 7s 9.5s linear forwards 1;

          @keyframes tire-far {
            to {
              transform: rotateY(90deg) translateZ(-.7rem)
              translateX(7.5rem) translateY(-14rem) scale(0);
            }
          }
        }
    }
    }

    .cabin {
      width: 40%;
      left: 100%;
      background: none;

      &::before,
      &::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        border: .3rem solid $truck-brd-clr;
      }

      .tire {
        left: 35%;
        transform: translateZ($tire-z) rotate(45deg) translateX(0) rotateY(0);
        @include rotate-turn-tire($tire-z);
      }

      &::before {
        border-top-right-radius: 50%;
        transform: translateZ(9.9vw);
        clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 73% 100%,
            73% 90%, 63% 80%, 43% 80%, 35% 90%, 35% 100%, 0% 100%);
        shape-outside: polygon(0% 0%, 100% 0%, 100% 100%, 73% 100%,
            73% 90%, 63% 80%, 43% 80%, 35% 90%, 35% 100%, 0% 100%);
        ;
      }

      &::after {
        background: none;
        border-top-left-radius: 50%;
        transform: rotateY(180deg) translateZ(7vw);
      }

      .right-window {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 40%;
        background: $mirror-clr;
        border: .3rem solid #fff;
        border-top-right-radius: 50%;
        transform: translateZ(10vw);

        .mirror {
          position: absolute;
          bottom: 0;
          right: -7.5%;
          width: 20%;
          height: 60%;
          border: .3rem solid #fff;
          border-radius: 40%;
          transform-origin: right;
          transform: rotateY(80deg);

          &::before,
          &::after {
            content: "";
            position: absolute;
          }

          &::before {
            top: 10%;
            left: 10%;
            width: 80%;
            height: 80%;
            border: .3rem solid #fff;
            transform-origin: left;
            transform: rotateY(-3600deg);
          }

          &::after {
            width: 100%;
            height: 100%;
            border: 1rem solid #fff;
            transform-origin: left;
            transform: rotateY(3600deg);
          }

        }
      }

      .left-window {
        position: absolute;
        top: 10%;
        left: 10%;
        width: 80%;
        height: 40%;
        border: .3rem solid #fff;
        border-top-right-radius: 50%;
        transform: translateZ(-10vw);

        .mirror {
          position: absolute;
          bottom: 0;
          right: -7.5%;
          width: 20%;
          height: 60%;
          border: .3rem solid #fff;
          border-radius: 40%;
          transform-origin: right;
          transform: rotateY(-80deg);

          &::before,
          &::after {
            content: "";
            position: absolute;
          }

          &::before {
            top: 10%;
            left: 10%;
            width: 80%;
            height: 80%;
            border: .3rem solid #fff;
            transform-origin: left;
            transform: rotateY(-3600deg);
          }

          &::after {
            width: 100%;
            height: 100%;
            border: 1rem solid #fff;
            transform-origin: left;
            transform: rotateY(3600deg);
          }

        }
      }
    }

    .container-left {
      transform: translateZ(-10vw);
    }

    .container-right {
      transform: translateZ(10vw);
    }

    .container-right,
    .container-left {
      clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 26% 100%,
          26% 90%, 23% 80%, 12% 80%, 9% 90%, 9% 100%, 0% 100%);
      shape-outside: polygon(0% 0%, 100% 0%, 100% 100%, 26% 100%,
          26% 90%, 23% 80%, 12% 80%, 9% 90%, 9% 100%, 0% 100%);
    }

    .truck-container {
      background: transparent;

      .tire:nth-child(4) {
        left: 10%;
        transform: translateZ($tire-z) rotate(45deg);
        @include rotate-tire($tire-z);
      }

      .tire:nth-child(5) {
        left: 10%;
        transform: rotateY(180deg) translateZ(9.9vw) rotate(45deg);
        &::before {display: none;}
        .back {
          &::before {
            transform: rotateY(90deg) translateZ(-.3rem);}
        }
      }
    }
    

    .container-left,
    .container-right,
    .truck-door {
      border: .3rem groove $truck-brd-clr;
    }

    .container-back {
      left: -25%;
      width: 50%;
      transform: rotateY(270deg);
      animation: far 7s 9.5s linear forwards 1;

      .truck-door {
        width: 100%;
        height: 100%;
        display: grid;
        place-items: center;
        transform-origin: bottom;

        strong {
          color: #fff;
          font-size: 3.5rem;
          transform: rotate(-35deg);
        }
      }
    }
    @keyframes far {
      to {
        transform: rotateY(270deg) scale(0);
      }
    }
    @keyframes door {
      from {
        transform: rotateX(225deg);
      }
      to {
        transform: rotateX(360deg);
      }
    }
  }
</style>