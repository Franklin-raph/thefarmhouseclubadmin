import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import Navbar from '../../components/navbar/Navbar'
import { Icon, marker } from 'leaflet'
import pinImage from '../../assets/images/pin.png'
import { useEffect, useState, useRef } from 'react'
import "leaflet/dist/leaflet.css"

import { useJsApiLoader, GoogleMap, MarkerF, InfoBox, InfoWindowF } from "@react-google-maps/api"

const Map = ({baseUrl}) => {

    const admin = JSON.parse(localStorage.getItem("admin"))
    const [markers, setMarkers] = useState([])
    const [showStates, setShowStates] = useState(false)
    const [showCrops, setShowCrops] = useState(false)
    
    const [state, setState] = useState("")
    const [crop, setCrop] = useState("")
    const [showButton, setShowButton] = useState(!false)

    const [initialMapLocation, setInitialMapLocation] = useState()
    const [map, setMap] = useState( /** @type google.maps.Map */ (null))
    const [selectedPlace, setSelectedPlace] = useState()

    const arrayOfCrops = [
        "Rice",
        "Coconut",
        "Millet",
        "Beans",
        "Yam",
        "Ginger",
        "Poultry Farm"
    ]

    const arrayOfStates = [
        "Abia",
        "Adamawa",
        "Akwa Ibom",
        "Anambra",
        "Bauchi",
        "Bayelsa",
        "Benue",
        "Borno",
        "Cross River",
        "Delta",
        "Ebonyi",
        "Edo",
        "Ekiti",
        "Enugu",
        "Gombe",
        "Imo",
        "Jigawa",
        "Kaduna",
        "Kano",
        "Katsina",
        "Kebbi",
        "Kogi",
        "Kwara",
        "Lagos",
        "Nasarawa",
        "Niger",
        "Ogun",
        "Ondo",
        "Osun",
        "Oyo",
        "Plateau",
        "Rivers",
        "Sokoto",
        "Taraba",
        "Yobe",
        "Zamfara"
    ]

    useEffect(() => {
        getMapInfo()
    },[])

    async function getMapInfo(){
        const response = await fetch(`${baseUrl}/farm-details/`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${admin.access}`
            },
        })
        const data = await response.json()
        if(response.ok){
            // setInitialMap(true)
            setMarkers(data)

            const geocodeMarkers = data.map(item => ({
                ...item,
                lat: item.geocode[0],
                lng: item.geocode[1]
            }));

            const markers = data.map(item => ({
                lat: item.geocode[0],
                lng: item.geocode[1]
            }));
            setInitialMapLocation(markers[0])
            setMarkers(geocodeMarkers)
        }
    }

    function locatePinsOnTheMap(){
        map.panTo(markers[0])
    }

    async function filterSearch(){
        const response = await fetch(`${baseUrl}/farm-details/?state=${state}&crop=${crop}`,{
        method:"GET",
            headers:{
                Authorization:`Bearer ${admin.access}`
            },
        })
        const data = await response.json()
        if(response.ok){
            // setInitialMap(true)
            setMarkers(data)
            const geocodeMarkers = data.map(item => ({
                ...item,
                lat: item.geocode[0],
                lng: item.geocode[1]
            }));

            const markers = data.map(item => ({
                lat: item.geocode[0],
                lng: item.geocode[1]
            }));
            // map.panTo(markers[0])
            // locatePinsOnTheMap()
            setInitialMapLocation(markers[0])
            map.panTo({lat: initialMapLocation.lat, lng: initialMapLocation.lng})
            console.log(initialMapLocation)
            setMarkers(geocodeMarkers)
        }
    }

    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey:"AIzaSyAmSs-dK11M2LdHuhoewEVFQAERDSzUvTo"
        // googleMapsApiKey:"AIzaSyCq9Jkh-EL6qaVdglI5NXMBq0uO3rgIA1I"
    })
    
      if(!isLoaded){
        return "Loading map"
      }

    // function loadMapFunction(){
        
    // }
    
  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content pb-5">
            <div className='border-b flex items-center justify-between mb-4'>
                <h1 className='text-[25px]'>Map</h1>
                <button className='bg-[#1AC888] text-white py-1 px-2 rounded-sm' onClick={getMapInfo}>Reload Map</button>
            </div>
            <div className='flex items-start justify-between gap-5'>
                {initialMapLocation &&
                    <GoogleMap center={{lat:initialMapLocation.lat, lng:initialMapLocation.lng }} zoom={7}
                    mapContainerStyle={{ width:"100%", height:"90vh" }} onLoad={map => setMap(map)}>
                        {markers && markers.map(center => (
                        <MarkerF 
                            onClick={() => setSelectedPlace(center)}
                            position={{ lat:center.lat, lng:center.lng }}
                        />
                        ))}
                        {selectedPlace &&
                        (
                            <InfoWindowF 
                                position={{ 
                                    lat:selectedPlace.lat, 
                                    lng:selectedPlace.lng 
                                }}
                                zIndex={1}
                                options={{ 
                                    pixelOffset:{
                                        width: 0,
                                        height: -40
                                    }
                                 }}
                                onCloseClick={() => setSelectedPlace("")}
                            >
                                <div>
                                    <div className='flex gap-1 items-center my-1'>
                                        <p className='font-bold'>State:</p>
                                        <p>{selectedPlace.state}</p>
                                    </div>
                                    <div className='flex gap-1 items-center my-1'>
                                        <p className='font-bold'>Crop:</p>
                                        <p>{selectedPlace.crop}</p>
                                    </div>
                                    <div className='flex gap-1 items-center my-1'>
                                        <p className='font-bold'>Farm Name:</p>
                                        <p>{selectedPlace.farm_name}</p>
                                    </div>
                                </div>
                            </InfoWindowF>
                        )
                        }
                    </GoogleMap>
                }

            <div className="filter">
                <div>
                    <p className='text-[12px]'>Filter by State and Crop</p>
                    <div className="states flex items-center justify-between cursor-pointer border pl-1" onClick={() => setShowStates(!showStates)}>
                        <p className='text-[12px]'>{state === "" ? "Select State" : state }</p>
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                    
                    {showStates && (
                        <div className='shadow bg-white p-3 state-drop-down'>
                            {arrayOfStates.map(state => (
                                <p className='cursor-pointer' onClick={() => {
                                    setState(state)
                                    setShowStates(!showStates)
                                }}>{state}</p>
                            ))}
                        </div>
                        )
                    }

                    <div className="states flex items-center justify-between cursor-pointer border pl-1 mt-3" onClick={() => setShowCrops(!showCrops)}>
                        <p className='text-[12px]'>{crop === "" ? "Select Crop" : crop }</p>
                        <i class="ri-arrow-down-s-line"></i>
                    </div>
                    {showCrops && (
                        <div className='shadow bg-white p-3 state-drop-down'>
                            {arrayOfCrops.map(crop => (
                                <p className='cursor-pointer' onClick={() => {
                                    setCrop(crop)
                                    setShowCrops(!showCrops)
                                }}>{crop}</p>
                            ))}
                        </div>
                        )
                    }
                    {showButton && <button className='mt-3 bg-[#1AC888] text-white py-1 px-2 w-full rounded-sm' onClick={filterSearch} >Search</button>}
                </div>
            {/* <button style={{ cursor:"pointer", width:"10%", padding:"1rem 0", margin:"2rem auto" }} onClick={() => {
                console.log(markers[0])
                map.panTo({lat: initialMapLocation.lat, lng: initialMapLocation.lng})
            }}>Click</button> */}
            <button style={{ cursor:"pointer", width:"10%", padding:"1rem 0", margin:"2rem auto" }} onClick={() => map.panTo({lat: 6.265001, lng: 7.115980})}>Click</button>
            </div>
            </div>
        </div>
    </div>
  )
}
// 9162234, 581550135

export default Map