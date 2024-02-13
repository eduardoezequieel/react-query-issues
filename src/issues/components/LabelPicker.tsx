import { useLabels } from "../../hooks/useLabels";
import { LoadingIcon } from "../../shared/components/LoadingIcon";

type Props = {
  selectedLabels: string[];
  onChange: (labelName: string) => void;
};

export const LabelPicker = ({ selectedLabels, onChange }: Props) => {
  const { isLoading, data } = useLabels();

  if (isLoading) {
    return <LoadingIcon />;
  }
  return (
    <div>
      {data?.map((label) => (
        <span
          key={label.id}
          className={`badge rounded-pill m-1 label-picker ${
            selectedLabels.includes(label.name) && "labelActive"
          }`}
          style={{
            border: `1px solid #${label.color}`,
            color: `#${label.color}`,
          }}
          onClick={() => onChange(label.name)}
        >
          {label.name}
        </span>
      ))}
    </div>
  );
};
