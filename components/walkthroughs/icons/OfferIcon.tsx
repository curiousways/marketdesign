import React from 'react';

const OfferIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <rect width="20" height="20" fill="url(#offer-icon)" />
    <defs>
      <pattern
        id="offer-icon"
        patternContentUnits="objectBoundingBox"
        width="1"
        height="1"
      >
        <use xlinkHref="#image0_1364_88600" transform="scale(0.015625)" />
      </pattern>
      <image
        id="image0_1364_88600"
        width="64"
        height="64"
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAH5klEQVR4nO2ad4xUVRTGfyzsLixt7aCiGNCAGGwEG9gg9sRCxAR7R1FUjAW7omKPRmMv0VhADCrYNTYMYgOMiCCKiFgQXQSEZcHd8Y/vXO/s2/d23pt5s0vifMlkZu655bx37z0dSiihhBL+x2jT2gwEsC8wBOgBLAU+B14G/mlNpoqJTkBv4HjgEyAT8vkRuBToB2zUOmymiyHAFGA1TR/2N+BW4BTgMmB2SJ86YAZwBlDWwrwXjFuABvzDrAC+Ad4CTgIqQ8YcCEwAvkLXInv8m0DXonOdEkbid/AKYJM856kAjgN+sfkmpsJdkdEfWIMYPjqlOXsCNTbn2SnNWRQcBPyMGL0v5blPsnnXAmPYwGRCB+AB/J19j6Z3vBLYOOZ8mwDj0M5n4za8TPgQ2DZPflNFG+BZxNRq4HJ0dx22Bl4A1lmfhcCJOeacZH2vCqEdDSw2+jygugDeU8GRiJkaYMcAbXOk2zPodPyN38ELIuY73Ogr0csLQ1fgM+t3dwG8p4JXjZHzQmiPGm0GsCXQFjgHvYy1NH3AjsAimn9BDv1snuU0PnEtjoWI4eB9rQBWISb7BGiTbczFgfbbrf1z9LJy4Tvrv10yltOFs/I6Btp7W/uSkDHnGu2xrLadgfXIF9g95tozbJ694nQuhtrYEqhCd3tNgOacmvKQce7I1tt3GfAQ0A6pzy9irv+HffeK2T91XI92YGoIrQwxmAH2DtDet/aR9t+diJ+AzgnWH2PjpiUYkxq64K2zQRF9xuNV3wFIb9+D1xrV6BT9ZW1HJeShGvjdxg5OOLZgnGwLv9VMnyrCXd91+Id93tpeypOPsTb+iTzH5w23u5fl6NcRuBFYgDy81/FC6zCbYxUKjDhsCmwWk4+BeFXborjOFr46z/FVwA82x0XWtg8SgO6kzAb2yzHPYOv7QZ585I1htvBM8gu33Wrjv0A6fxAyjjJIozj1WocCK1G4y/rdmwcPBaEcb7Udm3BsfyQH/gEGII0x1+Z6BDlOFeihMsjgCTOMeqCXVQ/0TfwEKWAUydVQGfCxjbvH2gbgjaZsL7Icb2mGSfkbjDY5Edcpoiv+mMYxXUG+QFDnn2Btk0L6P2m0s0JobxvtmDgLF8MSXIG8tgok1HKhO9IeIGdnlf1eb9/tQ8a0D/TJhosRLo6xdtHwLdqFHWL0nWB9pwTat8cHTjfNau+Ktyb7h8y3xGhRbnOL4Blj4oYc/Q7F6/xtQujuOE8DdgN2Ad4lWsYcaLTFxL9+RcFeyOVdR3QQtANemI2J6LMdfkeD+YPg6eqDjwpdXgDvqcEZRRkUHgtacYPwNkO7ZubpDjyIDKRFSCVulUVvB1yLjzq/k2O+FkMbJN1dyGshcnKy6cPQA+aLcuAVfHjtfprGIFodvVA0x+1OmgnZq2zeZSj8vsGiO7q3GZQVSgODkK1Rzwb+8A4H43MEE1AsoCeKIcRBZ/QidwduxvsI45sbtKFhBFJ5Qan+KwplB4OoXZBxND9kTANwBwUKvKj7WAWcb/QMUIveeAMyTEDW3ntI1SXBNii1PRTYAuiGtxjrUcZ3Htrtw/EnZD2KHSxF3uKjKA9QFIwgvFgh+Am7z5WokCHMhI3CTki91dJ0l98ADqFI1SxRx8c5JLNQeKsDeqC2aEf6GtNdUKZnOIrk7IZ21WEZ0vNvoDT2rxHrzQHORC90MIoTuhKZb5M/VuEYTWPXNIhrjL4Ab4Bk71oNktDZ7XXA48TzDwpFW2LmB6NOgPO/63LQe6N7+xqS7B8hi82hBwpfnQrsb9+nWL/pKEdYg0+L1dq45da2yH7HxVAkNIeiE7sUeBpllVc0M64JnIExLoJ+h9Gno6sQB71QomMF8eSL+3wHXEh0rq8M+f6fBsZla5t5SNjGxjgbGJaKBh+WGpVkUkMVcpDGovqBiSgMPhV5f++guz+Lxpnjj2jsT5Sj0zQ3q89vNq+TQwPxztRzSZh0RQeXRNAfMfoZSSbNA22BI4Dvbb23UWndaHyKPYOu3SgkrB26oRoE1+fhJAu7TM3oCPpTRs9V1JAWeuCLorLL6+YYD9myrA06GS5DtRK9nETRr4dscFTx0USjD08yaYE4D//gM1F9UDDo0RMZUq7fa4QHWv5DlBZwAieXFoiix8UE5BK7OOBKpFXq8JllpwUcr38ieyMbZchyvQm5w38gwflMLgYKVYOFvoAK48GVwMYphW0I/O+HzOI97f9zSBUui8NAa7+AY5A072T/u6BjXYn3D6rRvXbW6Bxrr0Chryvt9xIUgHmlQJ4AX+NzWAR9utGDOf6Wwi74fGEDEspxy+0aIZcMiPL0gjKiM7IK1yLzuFjl7VUoqzwanZQFSBV/mPZC04hOPYEKlzMoezMZPbCTvCuBF1GlR9C/LwRD8PbAelR43aHZEQXAFTAMjKC7xIf71ANfo9RW0JSdh4Idh+TJcDUSci6aNIumWiB1fIk/AWFelbPCaoE7aRzt3Ro4HeX0ltP4ZaxBrvFF5M7ctkcnzBlAtcjMTTXkHRVk+IamdXwgK2wdSk+VodTUV83M3w7YA+3+wSiel22R/Yhs//morqcSxRd2RUfe5fmmoXjB/FwPlBbGozdfgy9WCn5+Jnk15mYo2vQUPkrc3GcmcBpFrAJPGmbqhPR2OeF1gEnX3hUZMN2RvZ9BVtxcVN6ysID5SyihhBJKyIV/AdQNbiXLCJKgAAAAAElFTkSuQmCC"
      />
    </defs>
  </svg>
);

export default OfferIcon;
