<template>
    <div class="spinner">
        <svg viewBox="0 0 802 689" version="1.1" xmlns="http://www.w3.org/2000/svg">
            <g id="logo">
                <path fill="#7c2395" opacity="1.00" d=" M 178.44 30.28 C 212.77 13.88 250.97 6.12 288.95 6.50 C 362.97 6.49 436.99 6.51 511.00 6.49 C 537.00 7.44 563.03 6.83 589.04 7.00 C 646.86 7.00 704.68 6.99 762.51 7.01 C 762.52 85.62 762.45 164.23 762.54 242.84 C 763.23 253.55 762.95 264.29 763.00 275.02 C 762.99 324.37 763.02 373.71 762.99 423.06 C 763.02 429.56 762.62 436.03 762.18 442.50 C 760.83 455.97 758.78 469.37 755.56 482.52 C 751.35 496.38 747.42 510.43 741.08 523.51 C 734.91 536.69 727.99 549.56 719.77 561.59 C 714.38 569.82 708.00 577.31 701.88 584.99 C 688.34 599.82 673.80 613.93 657.11 625.20 C 619.15 652.54 573.19 668.07 526.55 670.74 C 507.03 671.24 487.51 670.90 467.99 671.00 C 408.00 671.00 348.00 671.00 288.01 671.00 C 279.35 671.18 270.71 670.53 262.08 670.01 C 186.55 669.98 111.02 670.01 35.50 670.00 C 35.50 593.66 35.49 517.33 35.50 440.99 C 34.57 411.33 35.17 381.66 35.00 351.99 C 35.00 321.99 35.00 291.98 35.00 261.98 C 34.78 244.09 36.01 226.10 39.62 208.56 C 48.35 163.25 70.03 120.49 101.56 86.78 C 110.43 77.01 120.25 68.16 130.51 59.87 C 145.38 48.38 161.43 38.34 178.44 30.28 M 487.00 202.00 C 487.00 313.67 487.00 425.33 487.00 537.00 C 513.83 537.00 540.67 537.00 567.50 537.00 C 567.50 425.33 567.50 313.67 567.50 202.00 C 540.67 202.00 513.83 202.00 487.00 202.00 M 231.00 205.50 C 231.00 316.33 231.00 427.17 231.00 538.00 C 258.33 538.00 285.67 538.00 313.00 538.00 C 313.00 427.17 313.00 316.33 313.00 205.50 C 285.67 205.50 258.33 205.50 231.00 205.50 Z" />
            </g>
        </svg>
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
    </div>
</template>

<style lang="scss" scoped>
@import '~assets/css/vars.scss';

.spinner {
    width: 40px;
    height: 40px;

    @media (max-width: 700px) {
        transform: scale(0.6);
    }
    svg {
        width:50px;
        height:50px;
        position: absolute;
        opacity: 0.7;
        top: 0;
        left: 0;
        animation: rotate 0.4s infinite linear;
    }
}

@keyframes rotate {
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(360deg);
    }
}

.infinite-status-prompt {
    color: rgba($primary, .65);
    font-size: 0.8rem;
    font-family: 'Roboto', sans-serif;
    margin: 64px auto;
    text-align: center;
}
</style>
