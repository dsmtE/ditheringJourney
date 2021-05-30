<script lang="ts">

    let canvas;
	const canvasCopy = document.createElement("canvas");

    export let maxWidth = 512;
    export let maxHeight = 512;

	const ditheringModes = [
		{ id: 0, text: `Original` },
		{ id: 1, text: `Bayer Dithering` },
		{ id: 2, text: `Floyd-steinberg Dithering` },
	];

	let selectedmode = ditheringModes[1];
	
	import { onMount } from 'svelte';
    import { BayerDithering, FloydDithering } from '$lib/core/dithering';
	

	function loadImage(url) {
		return new Promise(r => { let i = new Image(); i.onload = (() => r(i)); i.src = url; });
	}
	
	onMount(async () => {
		let img = await loadImage("../imgs/mountains.jpg") as HTMLImageElement;

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

		updateCanvas();
	})


	function updateCanvas() {
		resetCanvasImage();
		applyDither();
	}

	function resetCanvasImage() {
		canvas.getContext('2d').drawImage(canvasCopy, 0, 0, canvasCopy.width, canvasCopy.height, 0, 0, canvas.width, canvas.height);
	}

	function applyDither() {
		const ctx = canvas.getContext('2d');

		const imageData: ImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

		if(selectedmode.id == 1) BayerDithering(canvas.width, canvas.height, imageData.data, 8);
		if(selectedmode.id == 2) FloydDithering(canvas.width, canvas.height, imageData.data);

		ctx.putImageData(imageData, 0, 0);
	}

</script>

<div class="flex w-full items-center justify-center">
		<canvas bind:this={canvas} id="canvas"></canvas>
		<div>
			<p> dithering mode: </p>
			<!-- svelte-ignore a11y-no-onchange -->
			<select bind:value={selectedmode} on:change="{() => updateCanvas()}">
				{#each ditheringModes as mode}
					<option value={mode}>
						{mode.text}
					</option>
				{/each}
			</select>
		</div>
</div>

<style>
	canvas {
		background-color: white;
		@apply m-2;
	}
</style>