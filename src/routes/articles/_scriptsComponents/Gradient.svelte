<script lang="ts">

    let canvas;
	let gradientCanvas;

    const width = 512;
    const height = 32;
    export let step = 256;

	// $: step, updateDitherCanvas();
	
	import { onMount } from 'svelte';
    import { BayerDithering} from '$lib/core/dithering';


	onMount(() => {
		initGrad();
		updateDitherCanvas();
	})

	function initGrad() {
		// init gradient
		const gradientCtx = gradientCanvas.getContext('2d');
		const imageData: ImageData = gradientCtx.getImageData(0, 0, width, height);
		const buf = new ArrayBuffer(imageData.data.length);
		const buf8 = new Uint8ClampedArray(buf);
		
		// gradient pattern
		for (let y = 0; y < height; ++y) {
			for (let x = 0; x < width; ++x) {
				let value : number = Math.floor(x/width*255);
				value= Math.floor(value/(255/step))*(255/step);
				const id = (y * width + x)*4;
				buf8[id] = buf8[id+1] = buf8[id+2] = value;
				buf8[id+3] = 255;
			}
		}
		imageData.data.set(buf8);
		gradientCtx.putImageData(imageData, 0, 0);

	}

	function updateDitherCanvas() {

		const ctx = canvas.getContext('2d');
		const imageData: ImageData = ctx.getImageData(0, 0, width, height);
		
		
		const grad = gradientCanvas.getContext('2d').getImageData(0, 0, width, height).data;
		
		// copy from gradient
		imageData.data.set(grad);

		BayerDithering(width, height, imageData.data, 4);

		ctx.putImageData(imageData, 0, 0);
	}

</script>

<div class="flex flex-col w-full items-center justify-center">
	<canvas bind:this={gradientCanvas} id="canvas" width={width} height={height}></canvas>
	<p class="legend">gradient</p>

	<canvas bind:this={canvas} id="canvas" width={width} height={height}></canvas>
	<p class="legend"> bayer dithered gradient</p>

	<label>
		gradient sections:
		<input type=range bind:value={step} min=2 max=256 on:change={() => {initGrad(); updateDitherCanvas();}} />
	</label>
	
</div>
<style>
	canvas {
		background-color: white;
		@apply mt-2;
	}
</style>