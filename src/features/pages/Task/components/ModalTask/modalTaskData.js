import SecondModal from './components/SecondModal/index';
import FirstModal from './components/FirstModal/index';
import ThirdModal from './components/ThirdModal';

export const steps = [

  {
    title: 'Chọn loại công việc',
    content: <FirstModal/>,
    options: [
      {
        label: 'Chăn nuôi',
        value: 'livestock',
        nextStep: [
          {
            title: 'Chọn loại công việc',
            content: <SecondModal livestock/>,
          },
        ],
      },
      {
        label: 'Trồng trọt',
        value: 'planting',
        nextStep: [
          {
            title: 'Chọn loại công việc',
            content: <SecondModal planting/>,
          },
        ],
      },
      {
        label: 'Khác',
        value: 'other',
        nextStep: [
          {
            title: 'Thêm công việc',
            content: <ThirdModal other/>,
          },
        ]
      }
    ],
  },
  {
    title: 'Chọn loại công việc',
    content: <SecondModal/>,
    options: [
      {
        label: 'Con vật cụ thể',
        value: 'specificAnimal',
      },
      {
        label: 'Cả chuồng',
        value: 'wholeBarn',
      },
      {
        label: 'Cây trồng cụ thể',
        value: 'specificPlant',
      },
      {
        label: 'Cả vườn',
        value: 'wholeGarden',
      },
      {
        label: 'Khác',
        value: 'other',
      },
    ],
  },
  {
    title: 'Thêm công việc',
    content: <ThirdModal/>,
  },
]

