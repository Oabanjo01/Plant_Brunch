import {ItemProps, PlantProps} from '@app/constants/data/homepage';
import {Colors} from '@app/constants/colors';
import {screenHeight, screenWidth} from '@app/constants/dimensions';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import Svg, {ClipPath, Defs, Path, Rect} from 'react-native-svg';

export const SeparatorComponent = () => {
  return <View style={{width: screenWidth * 0.05}} />;
};

export const _renderPlantTypes = (item: PlantProps) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        source={require('@assets/images/Picture.png')}
        style={{
          borderRadius: 5,
          width: screenWidth * 0.8,
          height: screenHeight * 0.2,
          resizeMode: 'contain',
        }}
      />

      <View
        style={{
          backgroundColor: Colors.whiteColor,
          position: 'absolute',
          left: 0,
          bottom: 20,
          opacity: 0.8,
          padding: 5,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
        }}>
        <Text># {item.description1}</Text>
      </View>
    </View>
  );
};

export const _renderItem = (
  props: ItemProps,
  activeIndex: string,
  index: number,
  onPress: () => void,
) => {
  const {id, image, description} = props;
  let svgToRender;
  switch (props.id) {
    case '1':
      svgToRender = (
        <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <Defs>
            <ClipPath id="clip0_8_930">
              <Rect width="21" height="21" fill="white" />
            </ClipPath>
          </Defs>
          <Path
            d="M6.23436 11.8125C6.23436 14.1684 8.14413 16.0781 10.5 16.0781C12.8558 16.0781 14.7656 14.1684 14.7656 11.8125C14.7656 9.45666 12.8559 7.54689 10.5 7.54689C8.14417 7.54689 6.23436 9.45666 6.23436 11.8125ZM19.6875 4.59376H15.0937C14.7656 3.28124 14.4375 1.96875 13.125 1.96875H7.875C6.56252 1.96875 6.23437 3.28124 5.90625 4.59376H1.31249C0.590625 4.59376 0 5.18439 0 5.90625V17.7188C0 18.4406 0.590625 19.0312 1.31249 19.0312H19.6875C20.4094 19.0312 21 18.4406 21 17.7188V5.90625C21 5.18439 20.4094 4.59376 19.6875 4.59376ZM10.5 17.6367C7.28339 17.6367 4.67578 15.0292 4.67578 11.8125C4.67578 8.59588 7.28335 5.98827 10.5 5.98827C13.7167 5.98827 16.3243 8.59584 16.3243 11.8125C16.3242 15.0292 13.7167 17.6367 10.5 17.6367ZM19.6875 8.53127H17.0625V7.21878H19.6875V8.53127Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
        </Svg>
      );
      break;
    case '2':
      svgToRender = (
        <Svg width="27" height="27" viewBox="0 0 27 27" fill="none">
          <Defs>
            <ClipPath id="clip0_139_3">
              <Rect
                width="20.8776"
                height="20.8776"
                fill="white"
                transform="translate(7.52612) rotate(21.1301)"
              />
            </ClipPath>
          </Defs>
          <Path
            d="M19.4719 17.276C19.0258 16.8999 18.5915 16.6339 18.1684 16.479C17.7457 16.3239 17.2917 16.2318 16.8077 16.2028C16.3234 16.1737 15.9043 16.1866 15.5503 16.2414C15.1958 16.2961 14.842 16.3777 14.4878 16.4864C14.1334 16.5951 13.8967 16.6743 13.7776 16.7241C13.6584 16.7738 13.5672 16.8155 13.5042 16.8495C14.2472 16.0041 14.9079 15.0813 15.4859 14.0806L15.6582 14.1846C15.773 14.254 15.935 14.3353 16.1445 14.4288C16.354 14.5224 16.5973 14.6205 16.8738 14.7233C17.1502 14.8259 17.4536 14.9036 17.7832 14.956C18.1127 15.0084 18.4524 15.0398 18.8024 15.0501C19.1525 15.0606 19.5111 15.0097 19.8789 14.8979C20.2469 14.7862 20.599 14.6246 20.9347 14.4129C21.2704 14.2012 21.5978 13.8927 21.9168 13.4872C22.2362 13.0821 22.5122 12.5996 22.7447 12.0399C22.3167 11.683 21.8702 11.4105 21.4056 11.2227C20.9411 11.0347 20.5151 10.9307 20.1276 10.9098C19.7402 10.889 19.3467 10.9223 18.9464 11.009C18.5466 11.096 18.2117 11.1978 17.9417 11.3138C17.6721 11.4303 17.4078 11.5696 17.1498 11.7322C16.8913 11.8946 16.7207 12.0075 16.6378 12.0713C16.5548 12.135 16.4929 12.188 16.4514 12.2303C16.5316 12.0448 16.6352 11.7871 16.7626 11.4575C16.89 11.128 16.9572 10.9436 16.9638 10.9046L17.1028 10.7709C17.2031 10.6848 17.3234 10.5563 17.4642 10.386C17.6049 10.2155 17.7605 10.0177 17.931 9.79215C18.1014 9.56652 18.2556 9.30757 18.3935 9.01527C18.5316 8.72311 18.6531 8.41411 18.7581 8.08829C18.8633 7.76253 18.9136 7.41145 18.9091 7.03504C18.9047 6.65867 18.8498 6.28348 18.7445 5.90982C18.6393 5.53597 18.4403 5.14058 18.1476 4.72349C17.8548 4.30638 17.479 3.90519 17.0201 3.51965C16.4603 3.86954 16.0128 4.27326 15.6778 4.73079C15.3428 5.18827 15.1215 5.63151 15.014 6.06045C14.9065 6.48944 14.8685 6.94303 14.9 7.4216C14.9316 7.90015 14.9969 8.31255 15.0962 8.65901C15.1955 9.00549 15.3255 9.35335 15.4859 9.70266C15.6466 10.052 15.762 10.2818 15.8315 10.392C15.9013 10.5023 15.9566 10.5901 15.998 10.6561C15.7936 11.185 15.4771 11.8746 15.0484 12.7247L15.0723 12.5341C15.078 12.4114 15.0753 12.2459 15.0642 12.0377C15.053 11.8295 15.0319 11.5882 15.0005 11.3137C14.9693 11.0394 14.9053 10.7523 14.8088 10.4527C14.7124 10.1531 14.5949 9.85389 14.4565 9.55463C14.3182 9.2556 14.122 8.97157 13.8678 8.70267C13.6135 8.43382 13.3224 8.19637 12.9939 7.99028C12.6655 7.78408 12.2593 7.62317 11.7755 7.50685C11.2917 7.39068 10.7571 7.33601 10.1716 7.34291C10.019 7.8668 9.94384 8.36861 9.94581 8.8481C9.94785 9.32766 10.0129 9.74628 10.1411 10.1039C10.2693 10.4614 10.4502 10.8019 10.6832 11.1251C10.9164 11.4484 11.1611 11.7199 11.4175 11.9398C11.674 12.1597 11.9623 12.367 12.2826 12.5614C12.603 12.7561 12.8841 12.9063 13.1263 13.0124C13.3684 13.1186 13.6193 13.2177 13.8794 13.3098C14.1393 13.4018 14.3113 13.4581 14.3953 13.4779C14.4794 13.4979 14.548 13.514 14.6016 13.5264C13.9651 14.6125 13.2714 15.5562 12.5208 16.3567C12.4629 15.9677 12.3729 15.5917 12.2512 15.228C12.1293 14.8647 11.9166 14.462 11.6128 14.0198C11.3089 13.5775 10.937 13.1988 10.497 12.8829C10.0568 12.5673 9.46082 12.3055 8.70829 12.0979C7.95564 11.8905 7.10078 11.7974 6.14326 11.8189C6.15005 12.5125 6.21549 13.1457 6.3397 13.7184C6.46411 14.2908 6.62994 14.7716 6.83796 15.1601C7.04593 15.5486 7.29669 15.891 7.59 16.1877C7.88328 16.4842 8.18042 16.7176 8.48093 16.8879C8.78153 17.0581 9.10767 17.1945 9.45935 17.2972C9.81114 17.3997 10.1299 17.4686 10.4159 17.5045C10.7019 17.54 10.9949 17.5575 11.295 17.5568C10.0295 18.6332 8.70627 19.3479 7.32505 19.7007C5.94377 20.0538 4.62499 19.9918 3.3689 19.5147C3.23122 19.4615 3.09781 19.4619 2.96861 19.5162C2.83945 19.5704 2.74833 19.6662 2.69512 19.8038C2.64196 19.9414 2.64429 20.0754 2.70201 20.2061C2.75979 20.3365 2.85746 20.4286 2.99513 20.4818C4.50476 21.0567 6.08302 21.1154 7.72985 20.6568C9.37679 20.1981 10.9287 19.3013 12.3856 17.9659L12.5285 18.1459C12.6165 18.2631 12.7517 18.409 12.934 18.5835C13.1162 18.7581 13.3295 18.955 13.5737 19.1742C13.8179 19.3935 14.1003 19.5941 14.4213 19.7764C14.7421 19.9589 15.0799 20.1247 15.4342 20.2742C15.7887 20.4236 16.1766 20.5134 16.5983 20.5428C17.0198 20.5724 17.4436 20.5425 17.8692 20.4531C18.295 20.3638 18.7488 20.1705 19.2298 19.8734C19.7111 19.5768 20.1794 19.1833 20.6353 18.6933C20.3051 18.1246 19.9174 17.6521 19.4719 17.276Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
        </Svg>
      );
      break;
    case '3':
      svgToRender = (
        <Svg width="21" height="21" viewBox="0 0 21 21" fill="none">
          <Path
            d="M3.21238 2.47821C3.21181 2.47821 3.21118 2.47821 3.21061 2.47821C3.01199 2.47821 2.82519 2.55563 2.68412 2.69634C2.54151 2.83861 2.46295 3.02803 2.46295 3.22969V14.498C2.46295 14.9112 2.80044 15.2482 3.21535 15.2492C4.96451 15.2534 7.89504 15.618 9.9167 17.7336V5.94103C9.9167 5.80096 9.88093 5.66937 9.8134 5.56048C8.15411 2.88831 4.9655 2.48231 3.21238 2.47821Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
          <Path
            d="M18.5371 14.498V3.22963C18.5371 3.02798 18.4585 2.83855 18.3159 2.69629C18.1749 2.55558 17.9879 2.47816 17.7895 2.47816C17.7889 2.47816 17.7882 2.47816 17.7877 2.47816C16.0346 2.48233 12.846 2.88833 11.1867 5.5605C11.1191 5.66939 11.0834 5.80098 11.0834 5.94105V17.7335C13.1051 15.6179 16.0356 15.2533 17.7848 15.2492C18.1996 15.2481 18.5371 14.9111 18.5371 14.498Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
          <Path
            d="M20.2487 5.07687H19.7038V14.498C19.7038 15.553 18.8442 16.4133 17.7876 16.4159C16.3039 16.4195 13.8576 16.7096 12.1251 18.3493C15.1215 17.6157 18.2803 18.0926 20.0805 18.5028C20.3053 18.554 20.5375 18.5012 20.7176 18.3576C20.8971 18.2144 21 18.0004 21 17.7707V5.82821C21.0001 5.41394 20.663 5.07687 20.2487 5.07687Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
          <Path
            d="M1.29621 14.498V5.07687H0.751336C0.337133 5.07687 0 5.41394 0 5.82821V17.7705C0 18.0003 0.10295 18.2142 0.282405 18.3574C0.462355 18.5009 0.694417 18.554 0.919549 18.5026C2.71976 18.0923 5.87861 17.6155 8.8749 18.3491C7.14243 16.7094 4.6961 16.4194 3.21245 16.4159C2.15587 16.4133 1.29621 15.553 1.29621 14.498Z"
            fill={activeIndex === id ? Colors.whiteColor : Colors.primary}
          />
        </Svg>
      );
      break;

    default:
      break;
  }
  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}>
      <View
        style={{
          flexDirection: 'column',
          marginTop: id == activeIndex ? 0 : screenWidth * 0.01,
          height: id == activeIndex ? screenWidth * 0.24 : screenWidth * 0.22,
          alignItems: 'center',
          justifyContent: 'center',
          width: id == activeIndex ? screenWidth * 0.29 : screenWidth * 0.26,
          backgroundColor:
            id == activeIndex ? Colors.primary : Colors.whiteColor,
          borderRadius: id == activeIndex ? 10 : 5,
          shadowColor: Colors.primary,
          elevation: 0.5,
        }}>
        {svgToRender}
        <Text
          style={{
            marginTop: screenHeight * 0.01,
            color:
              activeIndex === id ? Colors.whiteColor : Colors.primaryTextColor,
          }}>
          {description}
        </Text>
      </View>
    </TouchableOpacity>
  );
};
