import { useState, useCallback } from "react";
import { type InputHTMLAttributes } from "react";
import { usePlacesWidget } from "react-google-autocomplete";
import TextInput from "./textInput";
import { env } from "~/env.mjs";
import {
  type UseFormRegister,
  type FieldErrors,
  type FieldError,
} from "react-hook-form";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

import { type AddressSchema } from "~/forms/address";

const convertPlaceToAddress = (
  place: google.maps.places.PlaceResult,
): AddressSchema | null => {
  if (!place?.address_components) {
    return null;
  }

  const address: AddressSchema = {
    streetNumber: "",
    street: "",
    suburb: "",
    city: "",
    postcode: "",
    lotNumbers: "",
    unitNumbers: "",
  };

  for (const component of place.address_components) {
    const types = component.types;

    if (types.includes("street_number")) {
      address.streetNumber += component.long_name + " ";
    } else if (types.includes("route")) {
      address.street += component.long_name;
    } else if (types.includes("locality")) {
      address.city = component.long_name;
    } else if (types.includes("administrative_area_level_1")) {
      address.suburb = component.short_name;
    } else if (types.includes("postal_code")) {
      address.postcode = component.long_name;
    }
  }

  const latLng = place.geometry?.location
    ? {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      }
    : undefined;

  address.position = latLng;

  return address;
};

export interface AddressProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isLoading?: boolean;
  error?: string | FieldError;
  leftAccessory?: React.ReactElement;
  rightAccessory?: React.ReactElement;
  className?: string;
  register: UseFormRegister<AddressSchema>;
  errors?: FieldErrors<Partial<AddressSchema>>;
}

const AutoComplete = ({ register, errors }: AddressProps) => {
  const [address, setAddress] = useState<AddressSchema | null>(null);
  const { ref } = usePlacesWidget<HTMLInputElement>({
    apiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      const newAddress = convertPlaceToAddress(place);
      setAddress(newAddress);
    },
    options: {
      types: ["address"],
    },
  });

  useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: env.NEXT_PUBLIC_GOOGLE_API_KEY,
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      // This is just an example of getting and using the map instance!!! don't just blindly copy!
      if (address?.position) {
        const pos = new window.google.maps.LatLng(address.position);
        map.setCenter(pos);
      }
    },
    [address],
  );

  return (
    <div>
      {!address ? (
        <input className="input input-bordered flex w-full grow" ref={ref} />
      ) : (
        <div className="flex space-x-4">
          <div className="flex basis-1/2 flex-col">
            <TextInput
              {...register("streetNumber")}
              defaultValue={address.streetNumber}
              placeholder="Street Number"
            />
            <TextInput
              {...register("street")}
              defaultValue={address.street}
              error={errors?.street?.message}
              placeholder="Street"
            />
            <TextInput
              {...register("suburb")}
              defaultValue={address.suburb}
              error={errors?.suburb?.message}
              placeholder="Suburb"
            />
            <TextInput
              {...register("postcode")}
              defaultValue={address.postcode}
              error={errors?.postcode?.message}
              placeholder="Postcode"
            />
            <TextInput
              {...register("lotNumbers")}
              defaultValue={address.lotNumbers}
              error={errors?.lotNumbers?.message}
              placeholder="Lot numbers (comma separated)"
            />
            <TextInput
              {...register("unitNumbers")}
              defaultValue={address.unitNumbers}
              error={errors?.unitNumbers?.message}
              placeholder="Unit numbers (comma separated)"
            />
            <input
              type="hidden"
              {...register("position.lat")}
              defaultValue={address.position?.lat}
            />

            <input
              type="hidden"
              {...register("position.lng")}
              defaultValue={address.position?.lng}
            />
            <button
              onClick={() => {
                setAddress(null);
              }}
            >
              Clear
            </button>
          </div>
          <div className="flex grow basis-1/2">
            <GoogleMap
              mapContainerStyle={{ width: "100%", height: "400px" }}
              zoom={17}
              onLoad={onLoad}
            >
              {address?.position && <Marker position={address.position} />}
            </GoogleMap>
          </div>
        </div>
      )}
    </div>
  );
};
export default AutoComplete;
