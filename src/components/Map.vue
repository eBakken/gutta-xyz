<template>
  <GmapMap
    :center="{lat:59.911491, lng:10.757933}"
    :zoom="12"
    :options="{disableDefaultUI: true}"
    map-type-id="roadmap"
    style="width: 100%; height: 100%"
  >
    <GmapCluster>
      <GmapMarker
        :key="m.id"
        v-for="m in markers"
        :position="m.position"
        :clickable="true"
        @click="center=m.position"
        :animation="2"
        :icon="randImage(m.id)"
      />
    </GmapCluster>
  </GmapMap>
</template>

<script>
import { db, auth } from '../firebase'
import rand from 'random-seed'
import geolocator from 'geolocator'

export default {
  data() {
    return {
      markers: [],
      uid: null,
    }
  },
  methods: {
    randImage: seed => `/icon/${rand.create(seed).intBetween(1, 24)}.png`,
    loginAndScheduleLocation() {
      auth.signInAnonymously().then(payload => {
        this.uid = payload.user.uid;
        setInterval(this.updatePosition, 30 * 1000);
      })
    },
    updatePosition() {
      geolocator.locate({
        enableHighAccuracy: true,
        timeout: 5000,
        maximumWait: 5000,
        maximumAge: 0,
        desiredAccuracy: 30,
        fallbackToIP: true,
        staticMap: false,
        addressLookup: false,
        timezone: false,
      }, (err, loc) => {
        if (err) return console.log(err);
        db.ref(`locations/group_1/${this.uid}/position`).set({
          lat: loc.coords.latitude,
          lng: loc.coords.longitude,
          timestamp: Date.now(),
        })
      })
    },
  },
  created() {
    db.ref("locations/group_1").on("value", snapshot => {
      const payload = snapshot.val();
      Object.entries(payload).map(([id, data]) => {
        const idx = this.markers.findIndex(marker => marker.id == id);
        if (idx != -1) {
          this.markers[idx].position = data.position;
        } else {
          this.markers.push(Object({
            id,
            position: data.position,
          }))
        }
      })
    });

    this.loginAndScheduleLocation();
  }
}
</script>
