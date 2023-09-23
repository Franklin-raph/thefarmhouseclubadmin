import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import Navbar from '../../components/navbar/Navbar'
import { Icon } from 'leaflet'
import pinImage from '../../assets/images/pin.png'
import { useEffect, useState } from 'react'

const Map = ({baseUrl}) => {

    const admin = JSON.parse(localStorage.getItem("admin"))
    const [markers, setMarkers] = useState([])
    const [showStates, setShowStates] = useState(false)
    const [showCrops, setShowCrops] = useState(false)
    const [initialMapLocation, setInitialMapLocation] = useState()
    const [arrayOfCrops, setArrayOfCrops] = useState([
        "Rice",
        "Coconut",
        "Millet",
        "Beans",
        "Yam",
        "Ginger",
        "Poultry Farm"
    ])
    const [state, setState] = useState("")
    const [crop, setCrop] = useState("")
    const [showButton, setShowButton] = useState(!false)
    const customIcon = new Icon({
        iconUrl: pinImage,
        iconSize:[38, 38]
    })
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
    },[state,crop,showButton])

    async function getMapInfo(){
        const response = await fetch(`${baseUrl}/farm-details/`,{
            method:"GET",
            headers:{
                Authorization:`Bearer ${admin.access}`
            },
        })
        const data = await response.json()
        if(response.ok){
            setMarkers(data)
            setInitialMapLocation(data[0])
        }
        console.log(data)
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
            setMarkers(data)
            setInitialMapLocation(data[0])
        }
        console.log(data)
    }
    
    console.log(initialMapLocation && initialMapLocation.geocode)
    
  return (
    <div>
        <Navbar />
        <div className="container-fluid dashboard-content">
            <h1 className='text-[25px] mb-2 border-b'>Map</h1>
            <div className='flex items-start justify-between gap-5'>
                {initialMapLocation && 
                    <MapContainer center={initialMapLocation.geocode} zoom={13} scrollWheelZoom={true}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {markers.map(marker=> (
                        <Marker position={marker.geocode} icon={customIcon}>
                            <Popup>
                                {marker.state}
                            </Popup>
                        </Marker>
                    ))}
                    </MapContainer>
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
            </div>
            </div>
        </div>
    </div>
  )
}

export default Map