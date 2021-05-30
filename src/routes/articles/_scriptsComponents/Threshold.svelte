<script lang="ts">

    let canvas;
	let thresholdCanvas;

    export let maxWidth = 256;
    export let maxHeight = 256;
	
	import { onMount } from 'svelte';
    import { Threshold } from '$lib/core/dithering';
	
	function loadImage(url) {
		return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}
	
	onMount(async () => {
		let img: Image = await loadImage("../imgs/mountains.jpg");
		const ctx = canvas.getContext('2d');
		const thresholdCtx = thresholdCanvas.getContext('2d');

		const canvasCopy = document.createElement("canvas");
		canvasCopy.width = img.width;
        canvasCopy.height = img.height;
        canvasCopy.getContext("2d").drawImage(img, 0, 0);

		let ratio = 1;

        if(img.width > maxWidth)
            ratio = maxWidth / img.width;
        else if(img.height > maxHeight)
            ratio = maxHeight / img.height;

        canvas.width = img.width * ratio;
        canvas.height = img.height * ratio;

		thresholdCanvas.width = canvas.width;
        thresholdCanvas.height = canvas.height;

		// copy on both canvas
        ctx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
		thresholdCtx.drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, thresholdCanvas.width, thresholdCanvas.height);
		
		// apply threshold on second canvas
		const imageData: ImageData = thresholdCtx.getImageData(0, 0, canvas.width, canvas.height);
		Threshold(canvas.width, canvas.height, imageData.data, 128);
		thresholdCtx.putImageData(imageData, 0, 0);
	})

</script>

<div class="flex flex-cols w-full items-center justify-center">
	<div>
		<canvas bind:this={canvas} id="canvas"></canvas>
		<p class="legend">original</p>
	</div>
	<div>
		<canvas bind:this={thresholdCanvas} id="canvas"></canvas>
		<p class="legend">poor threshold image</p>
	</div>
	
</div>
<style>
	canvas {
		background-color: white;
		@apply mt-2;
	}
</style>