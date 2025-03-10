import React from "react";
import { useForm } from "@mantine/form";
import { validateValue } from "../../utils/common";
import { Button, Group, Select, TextInput } from "@mantine/core";
import useCountries from "../../hooks/useCountries";
import Map from "../map/Map";

const AddLocation = ({ propertyDetails, setPropertyDetails, nextStep }) => {
  const { getAll } = useCountries();
  const form = useForm({
    initialValues: {
      address: propertyDetails?.address,
      city: propertyDetails?.city,
      country: propertyDetails?.country,
    },
    validate: {
      address: (value) => validateValue(value),
      city: (value) => validateValue(value),
      country: (value) => validateValue(value),
    },
  });

  const { country, city, address } = form.values;

  const handleSubmit = () => {
    const { hasErrors } = form.validate();
    if (!hasErrors) {
      setPropertyDetails((prev) => ({
        ...prev,
        address,
        city,
        country,
      }));
      nextStep();
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div
        className="flexCenter"
        style={{
          justifyContent: "space-between",
          gap: "3rem",
          marginTop: "3rem",
          flexDirection: "row",
        }}
      >
        <div className="flexColStart" style={{ flex: 1, gap: "1rem" }}>
          <Select
            w={"100%"}
            withAsterisk
            label="Country"
            clearable
            searchable
            data={getAll()}
            {...form.getInputProps("country", { type: "input" })}
          />
          <TextInput
            w={"100%"}
            withAsterisk
            label="City"
            {...form.getInputProps("city", { type: "input" })}
          />

          <TextInput
            w={"100%"}
            withAsterisk
            label="Address"
            {...form.getInputProps("address", { type: "input" })}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Map address={address} city={city} country={country} />
        </div>
      </div>
      <Group position="center" mt={"xl"}>
        <Button type="submit">Next Step</Button>
      </Group>
    </form>
  );
};

export default AddLocation;
