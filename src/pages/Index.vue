<template>
  <q-page class="q-pa-lg">
    <div class="options-box">
      <q-select v-model="student_name" :options="student_names" label="Student's name" filled />
      <q-select v-model="teacher_name" :options="teacher_names" label="Teacher's name" filled />
      <q-btn @click="video_type_model = !video_type_model" color="primary" icon="videocam" class="shadow-0"
        label="Video" />
    </div>

    <q-dialog v-model="video_type_model">
      <q-card>
        <q-card-section>
          <q-btn color="primary" style="width: 100%;" icon="camera" label="Camera" @click="startVideo" /> <br>
          <q-btn color="primary" class="q-mt-md" style="width: 100%;" icon="upload" label="Upload video"
            @click="triggerFileInput" />
          <!-- Hidden file input -->
          <input ref="videoUpload" type="file"
            accept="video/mp4, video/avi, video/mkv, video/webm, video/ogg, video/x-m4v, video/h264"
            style="display: none;" @change="handleFileUpload" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div class="grid-layout">
      <div class="video-section shadow-10">
        <video ref="videoElement" style="border-radius: 8px; transform: scaleX(-1);" width="1920" height="1080" controls
          autoplay></video>
      </div>
      <div class="info-section">
        <div v-if="!results && !loading" class="flex flex-center">
          <h6>Please submit the video</h6>
        </div>
        <div v-if="loading && !results" class="flex flex-center">
          <q-spinner-oval
            color="primary"
            size="3rem"
            :thickness="5"
          />
        </div>
        <div v-if="results" class="result-section">
          <h2>53%</h2>
        </div>
        <div v-if="results" class="graph-section">
          <q-img src="../assets/score_radar.png" :ratio="16 / 9" spinner-color="primary" spinner-size="82px" />
        </div>
      </div>

      <div class="video-options">
        <div class="row">
          <q-checkbox v-model="video_option.vv" color="orange" label="Option 1" />
          <q-checkbox v-model="video_option.vw" color="green" label="Option 2" />
          <q-checkbox v-model="video_option.vz" color="red" label="Option 3" />
        </div>
        <div class="flex">
          <q-select style="width: 150px;" v-model="video_type" :options="['Break dance', 'Salsa']" label="Dance type"
            outlined dense />
          <q-btn color="primary" flat label="Submit" @click="submitVideo" />
        </div>
      </div>

    </div>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  name: 'PageIndex',
  data() {
    return {
      student_names: ['Alice', 'Jay', 'Anna'],
      teacher_names: ['Li', 'Zhang', 'Wang'],
      student_name: '',
      teacher_name: '',
      errorDialog: false,
      video_type_model: false,
      video_option: {
        vv: false,
        vw: false,
        vz: false
      },
      video_type: "",
      currentStream: null,
      results: false,
      loading: false,
      src_file: null
    };
  },
  methods: {
    // Submit video file to the backend
    async submitVideo() {
      if (!this.src_file) {
        alert('Please select a video file first.');
        return;
      }

      this.loading = true;

      const formData = new FormData();
      formData.append('video', this.src_file);

      try {
        const response = await axios.post('http://localhost:3000/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        // Process the response and update UI
        console.log('Upload successful', response.data);
        this.results = true;
      } catch (error) {
        console.error('Error uploading video', error);
      } finally {
        this.loading = false;
      }
    },
    async startVideo() {
      try {
        // Stop any existing webcam stream
        if (this.currentStream) {
          this.currentStream.getTracks().forEach(track => track.stop());
        }

        // Request new webcam access
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        const videoElement = this.$refs.videoElement;
        videoElement.srcObject = stream; // Set the webcam stream
        videoElement.play();  // Start playing the webcam video
        this.currentStream = stream; // Save the stream reference

        // Add event listeners
        videoElement.addEventListener('pause', this.stopStream);
        videoElement.addEventListener('play', this.handlePlay);

        this.errorDialog = false;
        this.video_type_model = false; // Close the dialog after webcam selection
      } catch (error) {
        console.error('Error accessing the camera:', error);
        this.errorDialog = true;
      }
    },
    triggerFileInput() {
      this.$refs.videoUpload.click(); // Programmatically trigger the hidden file input
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.src_file = event.target.files[0];
      if (file) {
        const videoElement = this.$refs.videoElement;

        // Stop any existing webcam stream
        if (this.currentStream) {
          this.currentStream.getTracks().forEach(track => track.stop());
        }

        videoElement.srcObject = null;  // Reset the webcam stream if present
        videoElement.src = URL.createObjectURL(file); // Set the uploaded video as the source
        videoElement.play(); // Play the uploaded video automatically
        this.video_type_model = false;  // Close the dialog after selection
      }
    },
    stopStream() {
      // Stop the webcam stream if it's currently active
      if (this.currentStream) {
        this.currentStream.getTracks().forEach(track => track.stop());
        this.currentStream = null;
      }
    },
    handlePlay() {
      // Restart the webcam stream if it's currently stopped
      if (!this.currentStream) {
        this.startVideo();
      }
    }
  }
};
</script>

<style scoped>
.grid-layout {
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto;
  gap: 16px;
  margin-top: 16px;
}

.video-section {
  grid-column: 1 / 2;
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* Aspect ratio 16:9 (1080 / 1920 * 100) */
  overflow: hidden;
}

.video-section video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* Ensures the video covers the container without stretching */
  border-radius: 6px;
  /* Match the video border radius */
}

.info-section {
  grid-column: 2 / 3;
  display: grid;
  grid-template-rows: 1fr 1fr;
  gap: 16px;
}

.result-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}

.graph-section {
  display: flex;
  align-items: center;
  justify-content: center;
}

.video-options {
  display: flex;
  justify-content: space-between;
}

.video-section {
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  /* Aspect ratio 16:9 (1080 / 1920 * 100) */
  overflow: hidden;
  border-radius: 8px;
  /* Border radius for the container */
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  /* Shadow effect, replace with shadow-10 equivalent */
}

.video-section video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
}
</style>
