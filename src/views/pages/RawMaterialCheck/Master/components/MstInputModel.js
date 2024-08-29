import InputModel from "@/components/RawMaterialInspection/Filter/InputModel";

export const commonInput = (form = {}) => [
  InputModel(
    'Name',
    'text',
    'Enter Name',
    "name"
  ),
  InputModel(
    'Code',
    'text',
    'Enter Code',
    "code"
  ),
  InputModel(
    'Description',
    'text',
    'Enter Description',
    "description"
  ),
];
