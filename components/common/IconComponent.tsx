import { iconMap } from '@/lib/types';

const IconComponent = ({ iconName="Code", size=36 }) => {
    const RenderedIconComponent = iconMap[iconName];

    return (
        <RenderedIconComponent size={size} />
    );
};

export default IconComponent